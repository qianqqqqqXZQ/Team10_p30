"""Extract the archived bid without paraphrasing its substantive contents."""
from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'P30-materials/results/bid_P30.tex'
TEX = SOURCE.read_text(encoding='utf-8')


def group(text, start):
    assert text[start] == '{'
    depth = 1
    end = start + 1
    while depth:
        if text[end] == '{' and text[end-1] != '\\':
            depth += 1
        elif text[end] == '}' and text[end-1] != '\\':
            depth -= 1
        end += 1
    return text[start+1:end-1], end


def inline(text):
    out, i = '', 0
    while i < len(text):
        if text[i] == '\\':
            match = re.match(r'\\([a-zA-Z]+|.)', text[i:])
            name = match[1]
            i += len(match[0])
            if name in ('textbf', 'emph', 'texttt', 'nolinkurl', 'url', 'href'):
                value, i = group(text, i)
                if name == 'href':
                    label, i = group(text, i)
                    target = html.escape(value, quote=True)
                    ext = ' target="_blank" rel="noopener noreferrer"' if value.startswith('http') else ''
                    out += f'<a href="{target}"{ext}>{inline(label)}</a>'
                elif name == 'url':
                    target = html.escape(value, quote=True)
                    out += f'<a href="{target}" target="_blank" rel="noopener noreferrer">{html.escape(value)}</a>'
                else:
                    tag = {'textbf': 'strong', 'emph': 'em', 'texttt': 'code', 'nolinkurl': 'span'}[name]
                    out += f'<{tag}>{inline(value)}</{tag}>'
            elif name == 'PersonalInformation':
                sid, i = group(text, i)
                email, i = group(text, i)
                out += (f'<p>Student ID: {sid}</p>' if sid else '') + f'<p>Email: {inline(email)}</p>'
            elif name == 'BidProjectName':
                out += '“From Prompt to Film” — An AI-Empowered Micro-Film Studio'
            elif name == 'rightarrow':
                out += ' → '
            elif name in ('&', '%', '_', '#'):
                out += html.escape(name)
            elif name == '\\':
                out += '<br />'
            elif name in ('par', 'medskip', 'noindent'):
                out += ' '
            else:
                raise ValueError(f'Unsupported inline command: {name}')
        elif text[i] in '{}$':
            i += 1
        else:
            end = i+1
            while end < len(text) and text[end] not in '\\{}$':
                end += 1
            out += html.escape(text[i:end]).replace('---', '—').replace('--', '–').replace('``', '“').replace("''", '”')
            i = end
    return out.strip()


def blocks(text):
    text = re.sub(r'\\begin\{figure\}.*?\\end\{figure\}', '', text, flags=re.S)
    text = re.sub(r'\\Needspace\{[^\n]*\}', '', text)
    text = re.sub(r'\\(?:newpage|clearpage|medskip)\b', '', text)
    text = re.sub(r'\\par\b', '\n\n', text)
    text = text.replace('\\end{document}', '')
    result, paragraph, lists = [], [], []

    def flush():
        if paragraph:
            result.append('<p>' + inline(' '.join(paragraph)) + '</p>')
            paragraph.clear()

    for line in text.splitlines():
        line = line.strip()
        if not line or line.startswith('%'):
            flush()
            continue
        heading = re.match(r'\\(section|subsection)(\*)?\{', line)
        if heading:
            flush()
            title, _ = group(line, heading.end()-1)
            level = 2 if heading[1] == 'section' else 3 if not heading[2] else 4
            result.append(f'<h{level}>{inline(title)}</h{level}>')
        elif line.startswith('\\PersonalInformation'):
            flush()
            result.append('<div class="personal-information">' + inline(line) + '</div>')
        elif line.startswith(('\\begin{itemize}', '\\begin{enumerate}')):
            flush()
            tag = 'ul' if 'itemize' in line else 'ol'
            lists.append([tag, False])
            result.append(f'<{tag}>')
        elif line.startswith(('\\end{itemize}', '\\end{enumerate}')):
            flush()
            tag, opened = lists.pop()
            if opened:
                result.append('</li>')
            result.append(f'</{tag}>')
        elif line.startswith('\\item '):
            flush()
            if lists[-1][1]:
                result.append('</li>')
            result.append('<li>' + inline(line[6:]))
            lists[-1][1] = True
        else:
            paragraph.append(line)
    flush()
    assert not lists
    return '\n'.join(result)


def plain(value):
    return html.unescape(re.sub('<[^>]+>', '', value)).strip()


body = TEX[TEX.index('\\section{Introduction}'):]
intro_tex = body.split('\\section{Teammates}')[0].split('\n', 1)[1]
team_tex = body.split('\\section{Teammates}')[1].split('\\section{Ideas')[0]
team_intro_tex = team_tex.split('\\subsection{')[0]
member_sections = re.split(r'\\subsection\{([^}]+)\}', team_tex)[1:]
work_tex = body.split('\\subsection{Work Distribution}')[1].split('\\section{Conclusion}')[0]
responsibilities = {}
for match in re.finditer(r'\\item \\textbf\{([^}]+):\} ([^\n]+)', work_tex):
    responsibilities[match[1]] = plain(inline(match[2]))

tags = [
    ['Visual computing', 'Model experiments', 'Integration'],
    ['Datasets', 'Model evaluation', 'Training'],
    ['Scriptwriting', 'Video editing', 'LLMs'],
    ['Applications', 'CI/CD', 'Deployment'],
    ['Annotation', 'Labelme', 'JSON'],
    ['Structured scripts', 'Research', 'Programming'],
    ['Web development', 'User interfaces', 'Databases'],
]
members = []
for name, content in zip(member_sections[::2], member_sections[1::2]):
    if name == 'Why Our Team Fits This Project':
        fit_tex = content
        continue
    contact = re.search(r'\\PersonalInformation\{', content)
    sid, pos = group(content, contact.end()-1)
    email_tex, _ = group(content, pos)
    email = plain(inline(email_tex))
    intro = re.search(r'\\subsection\*\{Introduction\}\s*([\s\S]*?)(?=\\subsection\*)', content)[1]
    members.append({
        'name': name,
        'role': 'Leader' if not members else 'Member',
        'studentId': sid,
        'email': email,
        'intro': plain(inline(intro.strip())),
        'tags': tags[len(members)],
        'responsibility': responsibilities[name],
        'html': blocks(content),
    })

ideas_tex = body.split('\\section{Ideas \\& Design}')[1].split('\\section{Timeline')[0]
proposal_tex, technical_tex = ideas_tex.split('\\subsection{Technology Stack \\& System Design}')
timeline_tex = body.split('\\subsection{Timeline \\& Workflow}')[1].split('\\subsection{Work Distribution}')[0]
timeline_intro_tex = timeline_tex.split('\\begin{figure}')[0]
phase_tex = timeline_tex.split('\\end{figure}')[1]
phase_chunks = re.split(r'\\Needspace\{3\\baselineskip\}', phase_tex)[1:]
phase_names = [
    'Requirements, GPU & licences', 'Storyboard, queue & baseline',
    'First film & adaptation pilots', 'Review & documentation',
    'Low-workload review', 'Studio integration', 'Quality, cost & viewer trials',
    'Release, report & demonstration', 'Submission checks',
]
dates = [
    ('2026-10-21', '2026-11-03'), ('2026-11-04', '2026-11-24'),
    ('2026-11-25', '2026-12-15'), ('2026-12-16', '2027-01-05'),
    ('2027-01-06', '2027-02-28'), ('2027-03-01', '2027-03-09'),
    ('2027-03-10', '2027-03-16'), ('2027-03-17', '2027-03-30'),
    ('2027-03-31', '2027-04-01'),
]
phases = []
for i, chunk in enumerate(phase_chunks):
    label = re.search(r'\\item \\textbf\{([^}]+)\}', chunk)[1]
    tasks = re.findall(r'\\item (?!\\textbf)([^\n]+)', chunk)
    phases.append({
        'id': f'phase-{i+1}', 'name': phase_names[i],
        'date': plain(inline(label)), 'start': dates[i][0], 'end': dates[i][1],
        'kind': 'review' if i == 3 else 'light' if i == 4 else 'active',
        'tasks': [plain(inline(task)) for task in tasks],
    })

fit_items = re.findall(r'\\item \\textbf\{([^}]+):\} ([^\n]+)', fit_tex)
conclusion_tex = body.split('\\section{Conclusion}')[1]
data = {
    'team': 'UNNC GRP Team202610',
    'title': '“From Prompt to Film” — An AI-Empowered Micro-Film Studio',
    'date': 'October 15, 2026',
    'introHtml': blocks(intro_tex),
    'intro': [plain(inline(p)) for p in intro_tex.strip().split('\n\n') if p.strip() and not p.strip().startswith(('\\noindent', '\\par', '\\newpage'))],
    'teamIntroHtml': blocks(team_intro_tex),
    'members': members,
    'proposalHtml': blocks(proposal_tex),
    'technicalHtml': blocks(technical_tex),
    'timelineIntroHtml': blocks(timeline_intro_tex),
    'phases': phases,
    'workHtml': blocks(work_tex),
    'fit': [{'title': plain(inline(t)), 'body': plain(inline(p))} for t, p in fit_items],
    'conclusionHtml': blocks(conclusion_tex),
    'fullHtml': blocks(body),
}
assert len(members) == 7 and len(phases) == 9
assert all(phase['tasks'] for phase in phases)
assert not re.search(r'\\[a-zA-Z]', data['fullHtml']), 'Unconverted LaTeX'
(ROOT / 'src/data/bid.generated.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Extracted {len(members)} profiles, {len(phases)} phases and {len(plain(data["fullHtml"]).split())} words from {SOURCE.name}.')
