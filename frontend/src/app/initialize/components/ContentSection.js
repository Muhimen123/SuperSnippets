export default function ContentSection({ activeStep }) {
  const renderContent = () => {
    switch (activeStep) {
      case 1:
        return <h1 className="text-3xl font-bold">Github Repo</h1>;
      case 2:
        return <h1 className="text-3xl font-bold">Code Import</h1>;
      case 3:
        return <h1 className="text-3xl font-bold">Constraints</h1>;
      default:
        return <h1 className="text-3xl font-bold">Final Check</h1>;
    }
  };

  return (
    <div className="min-h-[200px] flex items-center justify-center">
      {renderContent()}
    </div>
  );
}