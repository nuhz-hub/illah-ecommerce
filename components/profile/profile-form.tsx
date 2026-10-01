"use client";

import { useState } from "react";
import { z } from "zod";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().max(30, "Phone number is too long"),
  location: z.string().max(100, "Location is too long"),
  bio: z.string().max(500, "Bio must be 500 characters or less"),
});

type ProfileFormProps = {
  userId: string;
  initialFullName: string;
  initialPhone: string;
  initialLocation: string;
  initialBio: string;
};

export function ProfileForm({
  userId,
  initialFullName,
  initialPhone,
  initialLocation,
  initialBio,
}: ProfileFormProps) {
  const supabase = createClient();

  const [fullName, setFullName] = useState(initialFullName);
  const [phone, setPhone] = useState(initialPhone);
  const [location, setLocation] = useState(initialLocation);
  const [bio, setBio] = useState(initialBio);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    const validation = profileSchema.safeParse({
      full_name: fullName.trim(),
      phone: phone.trim(),
      location: location.trim(),
      bio: bio.trim(),
    });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: validation.data.full_name,
        phone: validation.data.phone || null,
        location: validation.data.location || null,
        bio: validation.data.bio || null,
      })
      .eq("id", userId);

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Profile updated successfully.");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="full_name">Full name</Label>
        <Input
          id="full_name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Your full name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Your phone number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="City or area"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <textarea
          id="bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          placeholder="Tell people a little about yourself"
          maxLength={500}
          rows={5}
          className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {message && (
        <p className="text-sm text-green-600" role="status">
          {message}
        </p>
      )}

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}