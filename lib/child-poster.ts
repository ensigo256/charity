import { jsPDF } from "jspdf";
import type { SponsorshipProfile } from "@/lib/child-profile";

type PosterProfile = Pick<
  SponsorshipProfile,
  "firstName" | "secondName" | "ageGroup" | "image" | "background" | "needs" | "monthlyNeed" | "education" | "publicPosterApproved"
>;

async function imageData(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Unable to load the profile image.");
  const blob = await response.blob();
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to prepare the profile image."));
    reader.readAsDataURL(blob);
  });
  const dimensions = await new Promise<{ width: number; height: number }>(
    (resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve({ width: image.width, height: image.height });
      image.onerror = () => reject(new Error("Unable to read the profile image."));
      image.src = dataUrl;
    },
  );

  return {
    dataUrl,
    format: blob.type.includes("png") ? "PNG" : "JPEG",
    ...dimensions,
  } as const;
}

function publicText(value: unknown, maxLength: number) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export async function downloadChildPoster(profile: PosterProfile) {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
    if (!profile.publicPosterApproved) {
      throw new Error("This profile is not approved for offline export.");
    }
  const name = `${profile.firstName} ${profile.secondName || ""}`.trim();
  const needs = Array.isArray(profile.needs)
    ? profile.needs.filter(Boolean).join(", ")
    : profile.needs;

  pdf.setFillColor(247, 249, 246);
  pdf.rect(0, 0, pageWidth, 297, "F");
  pdf.setFillColor(18, 79, 63);
  pdf.rect(0, 0, pageWidth, 38, "F");

  try {
    const logo = await imageData("/logo.png");
    pdf.addImage(logo.dataUrl, logo.format, margin, 8, 22, 22, undefined, "FAST");
  } catch {
    // The poster remains readable if the organization mark cannot be loaded.
  }

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.text("CHILD SPONSORSHIP PROFILE", 44, 16);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.text("A reviewed profile for prospective sponsors", 44, 23);

  const imageBox = { x: margin, y: 46, width: contentWidth, height: 92 };
  pdf.setFillColor(231, 237, 231);
  pdf.roundedRect(imageBox.x, imageBox.y, imageBox.width, imageBox.height, 3, 3, "F");
  if (profile.image?.url) {
    try {
      const portrait = await imageData(profile.image.url);
      const scale = Math.min(
        imageBox.width / portrait.width,
        imageBox.height / portrait.height,
      );
      const width = portrait.width * scale;
      const height = portrait.height * scale;
      pdf.addImage(
        portrait.dataUrl,
        portrait.format,
        imageBox.x + (imageBox.width - width) / 2,
        imageBox.y + (imageBox.height - height) / 2,
        width,
        height,
        undefined,
        "FAST",
      );
    } catch {
      pdf.setTextColor(72, 89, 78);
      pdf.setFontSize(10);
      pdf.text("Profile photo unavailable", pageWidth / 2, 94, { align: "center" });
    }
  }

  let y = 151;
  pdf.setTextColor(26, 42, 34);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(25);
  const nameLines = pdf.splitTextToSize(publicText(name, 80), contentWidth);
  pdf.text(nameLines.slice(0, 2), margin, y);
  y += nameLines.length > 1 ? 20 : 12;

  pdf.setTextColor(30, 111, 83);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text(`AGE GROUP  ${publicText(profile.ageGroup || "Not provided", 24)}`, margin, y);
  y += 12;

  const sections = [
    { title: "ABOUT", value: publicText(profile.background, 330) },
    {
      title: "EDUCATION",
      value: publicText(profile.education?.currentLevel, 120),
    },
    { title: "SUPPORT NEEDS", value: publicText(needs, 220) },
  ].filter((section) => section.value);

  for (const section of sections) {
    if (y > 246) break;
    pdf.setDrawColor(213, 222, 214);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 8;
    pdf.setTextColor(30, 111, 83);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.text(section.title, margin, y);
    y += 6;
    pdf.setTextColor(48, 59, 51);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    const lines = pdf.splitTextToSize(section.value, contentWidth).slice(0, 4);
    pdf.text(lines, margin, y);
    y += lines.length * 5 + 7;
  }

  if (profile.monthlyNeed && y < 251) {
    pdf.setTextColor(26, 42, 34);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text(`Monthly support need: ${publicText(profile.monthlyNeed, 40)}`, margin, y);
  }

  pdf.setFillColor(18, 79, 63);
  pdf.rect(0, 276, pageWidth, 21, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.text(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL || window.location.origin}  ·  Profile reviewed ${new Date().toLocaleDateString()}`,
    margin,
    288,
  );
  pdf.setFontSize(7);
  pdf.text("Please contact the organization for current information.", margin, 293);

  const fileName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "child";
  pdf.save(`${fileName}-sponsorship-profile.pdf`);
}