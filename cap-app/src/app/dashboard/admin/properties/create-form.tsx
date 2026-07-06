"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateForm() {
  const [loading, setLoading] = useState(false);

  return (
    <form className="space-y-4 max-w-md" onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => setLoading(false), 1000); }}>
      <div>
        <label className="block text-sm font-medium mb-1">Property Name</label>
        <Input placeholder="e.g. Kyoto Zen Node" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <Input placeholder="e.g. Kyoto, Japan" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Monthly Cost ($)</label>
        <Input type="number" placeholder="e.g. 1500" required />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Create Property"}
      </Button>
    </form>
  );
}
