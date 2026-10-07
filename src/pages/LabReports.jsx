import { ArrowRight, FileText, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import { REPORTS } from '../data/store.js'

export default function LabReports() {
  return (
    <div className="container-x py-12 lg:py-16">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-brass">Product documentation</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Lab reports and certificates</h1>
      {REPORTS.length ? (
        <>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink/75">Review the product documents available below.</p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REPORTS.map((report) => (
              <li key={report.title} className="flex flex-col border border-line bg-white p-6">
                <FileText size={28} className="text-moss" />
                <h2 className="mt-4 text-lg font-semibold">{report.title}</h2>
                <p className="mt-1 flex-1 text-sm text-ink/65">{report.note}</p>
                <a href={report.file} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-moss hover:text-brass">
                  <Download size={16} /> Download PDF
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="mt-5 max-w-2xl border border-line bg-white p-6 sm:p-8">
          <p className="leading-relaxed text-ink/70">Verified report PDFs and certificates have not been added to this website yet. Contact us for current product information; this page will be updated when documents are available.</p>
          <Link to="/contact" className="btn-primary mt-6">Contact us <ArrowRight size={16} /></Link>
        </div>
      )}
    </div>
  )
}
