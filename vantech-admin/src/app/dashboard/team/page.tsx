'use client';

import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/lib/api/adminClient';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Upload,
  Loader2,
  Users,
  Linkedin,
  Twitter,
  Mail,
  GripVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  email?: string;
  order: number;
  active: boolean;
}

type FormState = Omit<TeamMember, 'id' | 'active'> & { active: boolean };

const EMPTY_FORM: FormState = {
  name: '',
  title: '',
  bio: '',
  imageUrl: '',
  linkedinUrl: '',
  twitterUrl: '',
  email: '',
  order: 0,
  active: true,
};

function MemberAvatar({ member, size = 56 }: { member: Pick<TeamMember, 'name' | 'imageUrl'>; size?: number }) {
  const [err, setErr] = useState(false);
  const initials = member.name
    .split(' ')
    .map((n) => n[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (member.imageUrl && !err) {
    return (
      <img
        src={member.imageUrl}
        alt={member.name}
        onError={() => setErr(true)}
        style={{ width: size, height: size }}
        className="rounded-full object-cover object-center ring-2 ring-blue-100 flex-shrink-0"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.3 }}
      className="rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-400 text-white font-bold ring-2 ring-blue-100 select-none"
    >
      {initials || '?'}
    </div>
  );
}

function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewErr, setPreviewErr] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await adminApi.uploadImage(fd);
      const url = res.data?.url || res.data?.data?.url;
      if (url) {
        onChange(url);
        setPreviewErr(false);
      }
    } catch {
      alert('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500">
        Photo
      </label>
      <div className="flex items-center gap-4">
        {/* Circular preview */}
        <div className="relative">
          {value && !previewErr ? (
            <img
              src={value}
              alt="Preview"
              onError={() => setPreviewErr(true)}
              className="h-20 w-20 rounded-full object-cover ring-2 ring-blue-200"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-slate-100 to-blue-50 ring-2 ring-blue-100 flex items-center justify-center text-slate-400">
              <Users className="h-8 w-8" />
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100 transition disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            {uploading ? 'Uploading…' : 'Upload photo'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => { onChange(''); setPreviewErr(false); }}
              className="text-xs text-red-500 hover:text-red-700 text-left"
            >
              Remove photo
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />
      </div>
      {/* Or paste URL */}
      <div>
        <input
          type="url"
          value={value}
          onChange={(e) => { onChange(e.target.value); setPreviewErr(false); }}
          placeholder="…or paste a Cloudinary URL"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </div>
  );
}

function MemberForm({
  initial,
  onSave,
  onCancel,
  saving,
}: {
  initial: FormState;
  onSave: (data: FormState) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<FormState>(initial);

  function set(field: keyof FormState, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.title.trim()) return;
    onSave(form);
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <ImageUploader value={form.imageUrl ?? ''} onChange={(url) => set('imageUrl', url)} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Full name"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
            Title / Role <span className="text-red-500">*</span>
          </label>
          <input
            required
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="e.g. CEO & Founder"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
          Bio
        </label>
        <textarea
          rows={3}
          value={form.bio ?? ''}
          onChange={(e) => set('bio', e.target.value)}
          placeholder="Short bio or description…"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5 flex items-center gap-1">
            <Mail className="h-3 w-3" /> Email
          </label>
          <input
            type="email"
            value={form.email ?? ''}
            onChange={(e) => set('email', e.target.value)}
            placeholder="email@company.com"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5 flex items-center gap-1">
            <Linkedin className="h-3 w-3" /> LinkedIn URL
          </label>
          <input
            type="url"
            value={form.linkedinUrl ?? ''}
            onChange={(e) => set('linkedinUrl', e.target.value)}
            placeholder="https://linkedin.com/in/…"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5 flex items-center gap-1">
            <Twitter className="h-3 w-3" /> Twitter URL
          </label>
          <input
            type="url"
            value={form.twitterUrl ?? ''}
            onChange={(e) => set('twitterUrl', e.target.value)}
            placeholder="https://twitter.com/…"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Display Order
          </label>
          <input
            type="number"
            min={0}
            value={form.order}
            onChange={(e) => set('order', Number(e.target.value))}
            className="w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div
            onClick={() => set('active', !form.active)}
            className={cn(
              'relative h-6 w-11 rounded-full transition-colors duration-200',
              form.active ? 'bg-blue-600' : 'bg-slate-300'
            )}
          >
            <div
              className={cn(
                'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200',
                form.active ? 'translate-x-5' : 'translate-x-0.5'
              )}
            />
          </div>
          <span className="text-sm font-medium text-slate-700">
            {form.active ? 'Active (visible)' : 'Hidden'}
          </span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
        >
          <X className="h-4 w-4" /> Cancel
        </button>
        <button
          type="submit"
          disabled={saving || !form.name.trim() || !form.title.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          {saving ? 'Saving…' : 'Save member'}
        </button>
      </div>
    </form>
  );
}

export default function TeamPage() {
  const qc = useQueryClient();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['team-members-admin'],
    queryFn: () => adminApi.getTeamMembers(),
    select: (res) => (res.data?.data ?? []) as TeamMember[],
  });

  const createMutation = useMutation({
    mutationFn: (d: FormState) => adminApi.createTeamMember(d),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['team-members-admin'] });
      setAdding(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormState }) =>
      adminApi.updateTeamMember(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['team-members-admin'] });
      setEditingId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteTeamMember(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['team-members-admin'] });
      setDeletingId(null);
    },
  });

  const members = data ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="card overflow-hidden p-[1px]">
        <div className="rounded-[1.45rem] bg-gradient-to-r from-slate-950 via-blue-950 to-blue-700 px-6 py-7 text-white sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-200">
                Team Members
              </p>
              <h1 className="mt-2 text-2xl font-semibold">
                Manage Your Team
              </h1>
              <p className="mt-1 text-sm text-blue-100/80">
                Add, edit, or remove team members. Changes reflect on the website instantly.
              </p>
            </div>
            <button
              onClick={() => { setAdding(true); setEditingId(null); }}
              className="inline-flex items-center gap-2 self-start rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition backdrop-blur-sm"
            >
              <Plus className="h-4 w-4" />
              Add member
            </button>
          </div>
        </div>
      </section>

      {/* Add Form */}
      {adding && (
        <section className="card p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5 flex items-center gap-2">
            <Plus className="h-4 w-4 text-blue-600" /> New Team Member
          </h2>
          <MemberForm
            initial={EMPTY_FORM}
            onSave={(d) => createMutation.mutate(d)}
            onCancel={() => setAdding(false)}
            saving={createMutation.isPending}
          />
        </section>
      )}

      {/* Members List */}
      <section className="space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : members.length === 0 ? (
          <div className="card p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium">No team members yet.</p>
            <p className="text-sm text-slate-400 mt-1">Click "Add member" to get started.</p>
          </div>
        ) : (
          members.map((member) => (
            <div key={member.id}>
              {editingId === member.id ? (
                <section className="card p-6">
                  <h2 className="text-base font-semibold text-slate-900 mb-5 flex items-center gap-2">
                    <Pencil className="h-4 w-4 text-blue-600" /> Edit: {member.name}
                  </h2>
                  <MemberForm
                    initial={{
                      name: member.name,
                      title: member.title,
                      bio: member.bio ?? '',
                      imageUrl: member.imageUrl ?? '',
                      linkedinUrl: member.linkedinUrl ?? '',
                      twitterUrl: member.twitterUrl ?? '',
                      email: member.email ?? '',
                      order: member.order,
                      active: member.active,
                    }}
                    onSave={(d) => updateMutation.mutate({ id: member.id, data: d })}
                    onCancel={() => setEditingId(null)}
                    saving={updateMutation.isPending}
                  />
                </section>
              ) : (
                <div className="card px-5 py-4 flex items-center gap-4">
                  <GripVertical className="h-4 w-4 text-slate-300 flex-shrink-0" />
                  <MemberAvatar member={member} size={52} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-slate-900 text-sm">{member.name}</p>
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                          member.active
                            ? 'bg-green-50 text-green-700'
                            : 'bg-slate-100 text-slate-500'
                        )}
                      >
                        {member.active ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-blue-600 text-xs font-medium">{member.title}</p>
                    {member.bio && (
                      <p className="text-slate-400 text-xs mt-1 truncate max-w-md">{member.bio}</p>
                    )}
                    <div className="flex items-center gap-3 mt-1.5 text-slate-400">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="flex items-center gap-1 text-xs hover:text-blue-600 transition">
                          <Mail className="h-3 w-3" /> {member.email}
                        </a>
                      )}
                      {member.linkedinUrl && (
                        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs hover:text-blue-600 transition">
                          <Linkedin className="h-3 w-3" /> LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => { setEditingId(member.id); setAdding(false); }}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-blue-200 hover:text-blue-600 transition"
                      aria-label="Edit member"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    {deletingId === member.id ? (
                      <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5">
                        <span className="text-xs text-red-700 font-medium">Delete?</span>
                        <button
                          onClick={() => deleteMutation.mutate(member.id)}
                          disabled={deleteMutation.isPending}
                          className="text-xs font-semibold text-red-700 hover:text-red-900 disabled:opacity-50"
                        >
                          {deleteMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Yes'}
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="text-xs text-slate-500 hover:text-slate-700"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingId(member.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-600 transition"
                        aria-label="Delete member"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}
