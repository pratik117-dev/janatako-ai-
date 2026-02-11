import CreateProjectForm from "../../CreateProjectForm";

export default function CreateProjectPage() {
  return (
    <main className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">नयाँ JAI परियोजना सिर्जना गर्नुहोस्</h1>
        <p className="text-muted-foreground">जनताको AI प्लेटफर्मका लागि नयाँ विश्लेषणात्मक वा अन्तर्क्रियात्मक परियोजना थप्नुहोस्।</p>
      </div>
      <CreateProjectForm />
    </main>
  );
}