import { CreateForm } from "./create-form";

export default function AdminPropertiesPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Properties Admin</h1>
        <p className="text-muted-foreground">Manage and add new properties to the CAP ecosystem.</p>
      </div>
      
      <div className="p-6 bg-card border border-border rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Add New Property</h2>
        <CreateForm />
      </div>
    </div>
  );
}
