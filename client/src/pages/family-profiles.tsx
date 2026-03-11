import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, Trash2, Edit2, UserPlus } from "lucide-react";

interface FamilyMember {
  id: string;
  userId: string;
  name: string;
  age: number | null;
  dietaryRestrictions: string[] | null;
  allergies: string[] | null;
  dislikes: string[] | null;
  createdAt: Date | null;
}

interface FormData {
  name: string;
  age: string;
  dietaryRestrictions: string;
  allergies: string;
  dislikes: string;
}

const emptyForm: FormData = {
  name: "",
  age: "",
  dietaryRestrictions: "",
  allergies: "",
  dislikes: "",
};

function parseCommaSeparated(value: string): string[] | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
}

function toFormData(member: FamilyMember): FormData {
  return {
    name: member.name,
    age: member.age != null ? String(member.age) : "",
    dietaryRestrictions: member.dietaryRestrictions?.join(", ") ?? "",
    allergies: member.allergies?.join(", ") ?? "",
    dislikes: member.dislikes?.join(", ") ?? "",
  };
}

function buildPayload(form: FormData) {
  return {
    name: form.name.trim(),
    age: form.age.trim() ? Number(form.age.trim()) : undefined,
    dietaryRestrictions: parseCommaSeparated(form.dietaryRestrictions),
    allergies: parseCommaSeparated(form.allergies),
    dislikes: parseCommaSeparated(form.dislikes),
  };
}

export default function FamilyProfilesPage() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);

  const {
    data: members,
    isLoading,
  } = useQuery<FamilyMember[] | null>({
    queryKey: ["/api/user/family"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const addMutation = useMutation({
    mutationFn: async (data: ReturnType<typeof buildPayload>) => {
      return apiRequest("POST", "/api/user/family", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/family"] });
      setShowForm(false);
      setForm(emptyForm);
      toast({ title: "Family member added" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to add member", description: error.message, variant: "destructive" });
    },
  });

  const editMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ReturnType<typeof buildPayload> }) => {
      return apiRequest("PATCH", `/api/user/family/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/family"] });
      setEditingId(null);
      setForm(emptyForm);
      toast({ title: "Family member updated" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update member", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/user/family/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/family"] });
      toast({ title: "Family member removed" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to remove member", description: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    const payload = buildPayload(form);
    if (editingId) {
      editMutation.mutate({ id: editingId, data: payload });
    } else {
      addMutation.mutate(payload);
    }
  };

  const startEditing = (member: FamilyMember) => {
    setEditingId(member.id);
    setForm(toFormData(member));
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isUnauthorized = members === null;
  const isSaving = addMutation.isPending || editMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-3xl flex-1">
        <div className="text-center mb-8">
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            data-testid="text-page-title"
          >
            Family Profiles
          </h1>
          <p className="text-stone-300 text-lg" data-testid="text-page-subtitle">
            Everyone's preferences, one place
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-5 bg-stone-700 rounded w-1/3" />
                    <div className="h-4 bg-stone-700 rounded w-1/4" />
                    <div className="h-4 bg-stone-700 rounded w-1/2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isUnauthorized ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 mx-auto text-stone-500 mb-4" />
              <p
                className="text-stone-300 text-lg mb-4"
                data-testid="text-auth-required"
              >
                Sign in to manage your family profiles
              </p>
              <a href="/profile.html" data-testid="link-sign-in">
                <Button>Sign In</Button>
              </a>
            </CardContent>
          </Card>
        ) : (
          <>
            {!showForm && (
              <div className="mb-6 flex justify-end">
                <Button
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                    setShowForm(true);
                  }}
                  data-testid="button-add-member"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Family Member
                </Button>
              </div>
            )}

            {showForm && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                    <UserPlus className="h-5 w-5 text-amber-400" />
                    {editingId ? "Edit Family Member" : "Add Family Member"}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-stone-300">Name</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="Family member name"
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="age" className="text-stone-300">Age (optional)</Label>
                      <Input
                        id="age"
                        type="number"
                        value={form.age}
                        onChange={(e) => updateField("age", e.target.value)}
                        placeholder="Age"
                        data-testid="input-age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dietary" className="text-stone-300">Dietary Restrictions (comma-separated)</Label>
                      <Input
                        id="dietary"
                        value={form.dietaryRestrictions}
                        onChange={(e) => updateField("dietaryRestrictions", e.target.value)}
                        placeholder="e.g. vegetarian, gluten-free"
                        data-testid="input-dietary-restrictions"
                      />
                    </div>
                    <div>
                      <Label htmlFor="allergies" className="text-stone-300">Allergies (comma-separated)</Label>
                      <Input
                        id="allergies"
                        value={form.allergies}
                        onChange={(e) => updateField("allergies", e.target.value)}
                        placeholder="e.g. peanuts, shellfish"
                        data-testid="input-allergies"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dislikes" className="text-stone-300">Dislikes (comma-separated)</Label>
                      <Input
                        id="dislikes"
                        value={form.dislikes}
                        onChange={(e) => updateField("dislikes", e.target.value)}
                        placeholder="e.g. mushrooms, olives"
                        data-testid="input-dislikes"
                      />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        onClick={handleSubmit}
                        disabled={!form.name.trim() || isSaving}
                        data-testid="button-save-member"
                      >
                        {isSaving ? "Saving..." : editingId ? "Update" : "Add Member"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={cancelForm}
                        data-testid="button-cancel"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {members && members.length === 0 && !showForm ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="h-12 w-12 mx-auto text-stone-500 mb-4" />
                  <p
                    className="text-stone-300 text-lg"
                    data-testid="text-empty-state"
                  >
                    No family members yet
                  </p>
                  <p className="text-stone-500 text-sm mt-1">
                    Add your family members to track their preferences
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {members?.map((member) => (
                  <Card key={member.id} data-testid={`card-member-${member.id}`}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="space-y-2 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3
                              className="text-white font-semibold text-lg"
                              data-testid={`text-member-name-${member.id}`}
                            >
                              {member.name}
                            </h3>
                            {member.age != null && (
                              <span
                                className="text-stone-400 text-sm"
                                data-testid={`text-member-age-${member.id}`}
                              >
                                Age {member.age}
                              </span>
                            )}
                          </div>

                          {member.dietaryRestrictions && member.dietaryRestrictions.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap" data-testid={`badges-dietary-${member.id}`}>
                              <span className="text-stone-400 text-xs">Dietary:</span>
                              {member.dietaryRestrictions.map((item, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="bg-amber-900/50 text-amber-400 border-amber-800/50"
                                  data-testid={`badge-dietary-${member.id}-${idx}`}
                                >
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {member.allergies && member.allergies.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap" data-testid={`badges-allergies-${member.id}`}>
                              <span className="text-stone-400 text-xs">Allergies:</span>
                              {member.allergies.map((item, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="bg-red-900/50 text-red-400 border-red-800/50"
                                  data-testid={`badge-allergy-${member.id}-${idx}`}
                                >
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {member.dislikes && member.dislikes.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap" data-testid={`badges-dislikes-${member.id}`}>
                              <span className="text-stone-400 text-xs">Dislikes:</span>
                              {member.dislikes.map((item, idx) => (
                                <span
                                  key={idx}
                                  className="text-stone-400 text-sm"
                                  data-testid={`text-dislike-${member.id}-${idx}`}
                                >
                                  {item}{idx < member.dislikes!.length - 1 ? "," : ""}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => startEditing(member)}
                            className="text-amber-400"
                            data-testid={`button-edit-${member.id}`}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteMutation.mutate(member.id)}
                            className="text-red-400"
                            disabled={deleteMutation.isPending}
                            data-testid={`button-delete-${member.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
