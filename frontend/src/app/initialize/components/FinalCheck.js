export default function FinalCheck({ repos, files }) {
  const getRepoName = (url) => {
    try {
      const parts = url.replace(/\/$/, "").split("/");
      return parts[parts.length - 1];
    } catch (e) {
      return url;
    }
  };

  const summaryData = {
    margin: "20",
    font: "Andika",
    fontSize: "12",
    pageLimit: "12",
    columns: "3"
  };

  return (
    <div className="w-full" style={{ width: '1008px' }}>
      <div className="rounded-3xl px-16 py-12 min-h-[300px]" style={{ backgroundColor: '#d9d9d9' }}>
        <div className="space-y-6 text-sm font-mono">
          <div>
            Github Repos selected: {repos?.map(getRepoName).join(", ")}
          </div>
          <div>
            Files uploaded: {files?.map(f => f.name).join(", ")}
          </div>
          <div>
            Margin: {summaryData.margin}
          </div>
          <div>
            Font: {summaryData.font}
          </div>
          <div>
            Font Size: {summaryData.fontSize}
          </div>
          <div>
            Page Limit: {summaryData.pageLimit}
          </div>
          <div>
            Columns: {summaryData.columns}
          </div>
        </div>
      </div>
    </div>
  );
}