export default function FinalCheck() {
  const summaryData = {
    githubRepos: "Katao",
    margin: "20",
    font: "Andika",
    fontSize: "12",
    pageLimit: "12",
    columns: "3"
  };

  return (
    <div className="w-full" style={{ width: '1008px' }}>
      <div className="rounded-xl p-8 min-h-[300px] border-2 border-blue-400" style={{ backgroundColor: '#d9d9d9' }}>
        <div className="space-y-4 text-base">
          <div>
            <span className="font-medium">Github Repos selected:</span> {summaryData.githubRepos}
          </div>
          <div>
            <span className="font-medium">Margin:</span> {summaryData.margin}
          </div>
          <div>
            <span className="font-medium">Font:</span> {summaryData.font}
          </div>
          <div>
            <span className="font-medium">Font Size:</span> {summaryData.fontSize}
          </div>
          <div>
            <span className="font-medium">Page Limit:</span> {summaryData.pageLimit}
          </div>
          <div>
            <span className="font-medium">Columns:</span> {summaryData.columns}
          </div>
        </div>
      </div>
    </div>
  );
}