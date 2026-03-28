// defaultLatex.ts
export default `
\\documentclass{article}
\\usepackage{lipsum}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{graphicx}
\\usepackage{hyperref}
\\usepackage{geometry}
\\geometry{margin=1in}

\\title{My Title}
\\author{Your Name}

\\begin{document}
\\maketitle

Hello, World! This is a multi-line editable LaTeX example.

\\section{Introduction}
This document demonstrates a long LaTeX template with multiple sections, subsections, math content, lists, tables, figures, and filler text.  
Feel free to edit or remove anything.

\\subsection{Purpose}
The purpose of this template is to provide a 100+ line LaTeX document for testing compilers, editors, or preview systems.

\\subsection{Background}
\\lipsum[1]

\\section{Mathematics}
Here is an inline equation: $a^2 + b^2 = c^2$.

And a displayed equation:
\\[
\\int_0^\\infty e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}.
\\]

\\subsection{Aligned Equations}
\\begin{align}
f(x) &= x^2 + 2x + 1 \\\\
g(x) &= \\sin(x) + \\cos(x) \\\\
h(x) &= e^x
\\end{align}

\\section{Lists}

\\subsection{Itemize}
\\begin{itemize}
  \\item First item
  \\item Second item
  \\item Third item
  \\item Another point for testing
  \\item Additional dummy line
\\end{itemize}

\\subsection{Enumerate}
\\begin{enumerate}
  \\item Step one
  \\item Step two
  \\item Step three
  \\item Step four
  \\item Step five
\\end{enumerate}

\\section{Table Example}
Below is a sample table:

\\begin{table}[h!]
\\centering
\\begin{tabular}{|c|c|c|}
\\hline
A & B & C \\\\ \\hline
1 & 2 & 3 \\\\ \\hline
4 & 5 & 6 \\\\ \\hline
7 & 8 & 9 \\\\ \\hline
\\end{tabular}
\\caption{Sample Table}
\\end{table}

\\section{Figure Example}
Here is a placeholder figure environment:

\\begin{figure}[h!]
\\centering
\\fbox{\\rule{0pt}{2in} \\rule{3in}{0pt}}
\\caption{Placeholder Figure Box}
\\end{figure}

\\section{More Filler Text}
Here are more paragraphs so that the file grows over 100 lines:

\\lipsum[2]
\\lipsum[3]
\\lipsum[4]
\\lipsum[5]

\\section{Subsections for Length}
\\subsection{Extra Section 1}
\\lipsum[6]

\\subsection{Extra Section 2}
\\lipsum[7]

\\subsection{Extra Section 3}
\\lipsum[8]

\\subsection{Extra Section 4}
\\lipsum[9]

\\subsection{Extra Section 5}
\\lipsum[10]

\\section{Random Text Blocks}
Below are random paragraphs to further increase document length:

\\lipsum[11]
\\lipsum[12]
\\lipsum[13]

\\section{Conclusion}
This concludes the long LaTeX test document.  
You can continue extending it as much as you want.  
Thank you for using this template.

\\end{document}
`;
