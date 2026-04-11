import { Edit2, Trash2, FileText } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const typeColors = {
  birthday: "bg-pink-100 text-pink-700",
  anniversary: "bg-red-100 text-red-700",
  welcome: "bg-blue-100 text-blue-700",
  event: "bg-purple-100 text-purple-700",
  festival: "bg-amber-100 text-amber-700",
};

export default function TemplateCard({ template, onEdit, onDelete }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {template.image_url ? (
        <div className="h-40 overflow-hidden">
          <img
            src={template.image_url}
            alt={template.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-40 bg-muted/50 flex items-center justify-center">
          <FileText className="h-12 w-12 text-muted-foreground/30" />
        </div>
      )}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-foreground">{template.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{template.subject}</p>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${typeColors[template.type] || "bg-gray-100 text-gray-700"}`}>
            {template.type}
          </span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Badge variant={template.is_active ? "default" : "secondary"} className="text-[10px]">
            {template.is_active ? "Active" : "Inactive"}
          </Badge>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
              <Edit2 className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDelete}>
              <Trash2 className="h-3.5 w-3.5 text-destructive" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}