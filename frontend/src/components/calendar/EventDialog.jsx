import { useState, useEffect } from "react";
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
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const emptyForm = {
  title: "",
  description: "",
  event_date: "",
  event_type: "company_event",
  send_email: false,
};

export default function EventDialog({ open, onOpenChange, event, selectedDate, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title || "",
        description: event.description || "",
        event_date: event.event_date || "",
        event_type: event.event_type || "company_event",
        send_email: event.send_email || false,
      });
    } else {
      setForm({ ...emptyForm, event_date: selectedDate || "" });
    }
  }, [event, selectedDate, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    if (event) {
      await base44.entities.Event.update(event.id, form);
      toast.success("Event updated.");
    } else {
      await base44.entities.Event.create(form);
      toast.success("Event created.");
    }
    setSaving(false);
    onSave();
  };

  const handleDelete = async () => {
    if (event) {
      await base44.entities.Event.delete(event.id);
      toast.success("Event deleted.");
      onSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">
            {event ? "Edit Event" : "Add Event"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Event Title *</Label>
            <Input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Event Date *</Label>
              <Input
                required
                type="date"
                value={form.event_date}
                onChange={(e) => setForm({ ...form, event_date: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Event Type</Label>
              <Select value={form.event_type} onValueChange={(v) => setForm({ ...form, event_type: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="company_event">Company Event</SelectItem>
                  <SelectItem value="holiday">Holiday</SelectItem>
                  <SelectItem value="celebration">Celebration</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={form.send_email}
              onCheckedChange={(v) => setForm({ ...form, send_email: v })}
            />
            <Label>Send email to all employees</Label>
          </div>
          <div className="flex items-center justify-between pt-2">
            {event && (
              <Button type="button" variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
            <div className="flex gap-3 ml-auto">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="bg-accent text-accent-foreground hover:bg-accent/90">
                {saving ? "Saving..." : event ? "Update" : "Create Event"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}