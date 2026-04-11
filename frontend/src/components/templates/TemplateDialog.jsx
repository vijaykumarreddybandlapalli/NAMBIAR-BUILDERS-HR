import { useState, useEffect, useRef } from "react";
import { base44 } from "../../api/base44Client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Upload, ImageIcon } from "lucide-react";
import { toast } from "sonner";

const emptyForm = {
  name: "",
  type: "birthday",
  subject: "",
  body: "",
  image_url: "",
  is_active: true,
};

export default function TemplateDialog({ open, onOpenChange, template, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (template) {
      setForm({
        name: template.name || "",
        type: template.type || "birthday",
        subject: template.subject || "",
        body: template.body || "",
        image_url: template.image_url || "",
        is_active: template.is_active !== false,
      });
    } else {
      setForm(emptyForm);
    }
  }, [template, open]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm({ ...form, image_url: file_url });
    setUploading(false);
    toast.success("Image uploaded.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (template) {
      await base44.entities.EmailTemplate.update(template.id, form);
      toast.success("Template updated.");
    } else {
      await base44.entities.EmailTemplate.create(form);
      toast.success("Template created.");
    }
    setSaving(false);
    onSave();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            {template ? "Edit Template" : "New Template"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Template Name *</Label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Type *</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="welcome">Welcome</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Email Subject *</Label>
            <Input
              required
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              placeholder="e.g., Happy Birthday {{name}}!"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Email Body *</Label>
            <Textarea
              required
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              rows={6}
              placeholder="Use {{name}} for employee name..."
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-1.5">
            <Label>Template Image</Label>
            <div className="flex items-center gap-3">
              {form.image_url ? (
                <div className="relative h-20 w-32 rounded-lg overflow-hidden border">
                  <img src={form.image_url} alt="Template" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image_url: "" })}
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileRef.current?.click()}
                  className="h-20 w-32 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors"
                >
                  {uploading ? (
                    <div className="w-5 h-5 border-2 border-muted border-t-primary rounded-full animate-spin" />
                  ) : (
                    <>
                      <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground mt-1">Upload</span>
                    </>
                  )}
                </div>
              )}
              <input
                type="file"
                ref={fileRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Switch
              checked={form.is_active}
              onCheckedChange={(v) => setForm({ ...form, is_active: v })}
            />
            <Label>Active Template</Label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="bg-accent text-accent-foreground hover:bg-accent/90">
              {saving ? "Saving..." : template ? "Update" : "Create Template"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}