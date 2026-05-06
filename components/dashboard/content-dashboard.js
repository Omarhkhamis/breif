"use client";

import {
  AlertCircle,
  BarChart3,
  Blocks,
  BrainCircuit,
  CheckCircle2,
  FileText,
  Globe,
  Home,
  Image,
  LayoutDashboard,
  Link,
  LoaderCircle,
  LogOut,
  Mail,
  MapPin,
  MessageCircleMore,
  MousePointerClick,
  Navigation,
  PaintBucket,
  Pencil,
  PhoneCall,
  Plus,
  Quote,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  Upload,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

const tabs = [
  { id: "general", label: "إعدادات عامة", icon: Settings },
  { id: "gallery", label: "المعرض", icon: Image },
  { id: "admins", label: "الأدمن", icon: UserCog },
  { id: "brand", label: "الهوية", icon: Sparkles },
  { id: "header", label: "الهيدر", icon: Navigation },
  { id: "hero", label: "قسم الهيرو", icon: Home },
  { id: "problems", label: "قسم المشكلة", icon: MousePointerClick },
  { id: "process", label: "قسم المنهجية", icon: Target },
  { id: "philosophy", label: "قسم الفلسفة", icon: Quote },
  { id: "services", label: "قسم الخدمات", icon: Blocks },
  { id: "projects", label: "قسم الأعمال", icon: Image },
  { id: "cta", label: "قسم التواصل", icon: MessageCircleMore },
  { id: "footer", label: "الفوتر", icon: FileText },
];

const iconOptions = {
  highlights: ["Blocks", "Sparkles", "TrendingUp"],
  problems: ["MousePointerClick", "BrainCircuit", "BarChart3"],
  services: ["PaintBucket", "Blocks", "TrendingUp", "ShieldCheck"],
  contacts: ["Globe", "Mail", "PhoneCall", "MessageCircleMore", "MapPin"],
  socials: [
    "FacebookIcon",
    "InstagramIcon",
    "TiktokIcon",
    "WhatsappIcon",
    "TelegramIcon",
    "LinkedinIcon",
    "XIcon",
  ],
};

const dashboardIconComponents = {
  BarChart3,
  Blocks,
  BrainCircuit,
  FacebookIcon,
  Globe,
  InstagramIcon,
  LinkedinIcon,
  Mail,
  MapPin,
  MessageCircleMore,
  MousePointerClick,
  PaintBucket,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  TelegramIcon,
  TiktokIcon,
  TrendingUp,
  WhatsappIcon,
  XIcon,
};

const socialPlatformPresets = [
  { label: "Facebook", icon: "FacebookIcon", value: "", href: "" },
  { label: "Instagram", icon: "InstagramIcon", value: "", href: "" },
  { label: "TikTok", icon: "TiktokIcon", value: "", href: "" },
  { label: "WhatsApp", icon: "WhatsappIcon", value: "", href: "" },
  { label: "Telegram", icon: "TelegramIcon", value: "", href: "" },
  { label: "LinkedIn", icon: "LinkedinIcon", value: "", href: "" },
  { label: "X", icon: "XIcon", value: "", href: "" },
];

const contactMethodPresets = [
  { icon: "Globe", label: "الموقع", value: "", href: "", external: true },
  { icon: "Mail", label: "الإيميل", value: "", href: "", external: false },
  { icon: "PhoneCall", label: "الهاتف", value: "", href: "", external: false },
  { icon: "MessageCircleMore", label: "واتساب", value: "", href: "", external: true },
];

const blankItems = {
  navLink: { label: "رابط جديد", href: "#" },
  quickLink: { label: "رابط جديد", href: "#" },
  highlight: {
    icon: "Blocks",
    title: "ميزة جديدة",
    copy: "وصف مختصر للميزة.",
  },
  stat: { value: "+0%", label: "مؤشر جديد" },
  problem: {
    icon: "MousePointerClick",
    title: "عنوان المشكلة",
    copy: "وصف مختصر للمشكلة.",
  },
  process: {
    title: "خطوة جديدة",
    copy: "وصف مختصر للخطوة.",
  },
  service: {
    icon: "PaintBucket",
    title: "خدمة جديدة",
    copy: "وصف مختصر للخدمة.",
  },
  project: {
    domain: "تصنيف",
    title: "اسم المشروع",
    image: "https://picsum.photos/seed/brief-new/1200/900",
    result: "نتيجة مختصرة",
    background: "linear-gradient(145deg, #081c3a 0%, #0d55d6 48%, #19c3d6 100%)",
  },
  contact: {
    icon: "Mail",
    label: "وسيلة تواصل",
    value: "hello@briefagency.co",
    href: "mailto:hello@briefagency.co",
    external: false,
  },
  social: {
    label: "Social",
    href: "https://example.com",
    icon: "InstagramIcon",
  },
};

const defaultAddress = {
  icon: "MapPin",
  label: "العنوان",
  value: "القاهرة، مصر",
  href: "https://maps.google.com/?q=Cairo%2C%20Egypt",
  external: true,
};

const defaultLogo = {
  src: "",
  alt: "شعار بريف ايجنسي",
};

const defaultIcons = {
  icon: "/upload/favicon.svg",
};

const blankAdminForm = {
  name: "",
  email: "",
  password: "",
};

function cloneContent(value) {
  return JSON.parse(JSON.stringify(value));
}

function getByPath(source, path) {
  return path.reduce((current, key) => current?.[key], source);
}

function setByPath(source, path, value) {
  if (!path.length) {
    return value;
  }

  const [head, ...tail] = path;
  const base = source ?? (typeof head === "number" ? [] : {});
  const next = Array.isArray(base) ? [...base] : { ...base };

  next[head] = setByPath(base?.[head], tail, value);
  return next;
}

function getPresetId(item) {
  return item?.icon || item?.label || "";
}

function getAvailablePresetOptions(items, presets) {
  const usedPresetIds = new Set(items.map(getPresetId));
  return presets.filter((preset) => !usedPresetIds.has(getPresetId(preset)));
}

async function confirmDelete(title = "تأكيد الحذف", text = "هل تريد متابعة الحذف؟") {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#64748b",
    confirmButtonText: "حذف",
    cancelButtonText: "إلغاء",
    reverseButtons: true,
  });

  return result.isConfirmed;
}

function showSaveToast(message) {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#ecfdf5",
    color: "#065f46",
    iconColor: "#16a34a",
  });
}

function normalizeContent(rawContent) {
  const nextContent = cloneContent(rawContent);
  nextContent.layout = nextContent.layout ?? {};
  nextContent.layout.metadata = nextContent.layout.metadata ?? {};
  nextContent.layout.metadata.icons =
    nextContent.layout.metadata.icons &&
    typeof nextContent.layout.metadata.icons === "object" &&
    !Array.isArray(nextContent.layout.metadata.icons)
      ? nextContent.layout.metadata.icons
      : defaultIcons;
  nextContent.layout.metadata.icons.icon =
    nextContent.layout.metadata.icons.icon ?? defaultIcons.icon;
  nextContent.brand = nextContent.brand ?? {};
  nextContent.brand.logo = {
    ...defaultLogo,
    ...(nextContent.brand.logo ?? {}),
  };
  nextContent.siteFooter = nextContent.siteFooter ?? {};
  nextContent.siteFooter.contacts = nextContent.siteFooter.contacts ?? [];
  nextContent.siteFooter.socialLinks = nextContent.siteFooter.socialLinks ?? [];
  nextContent.siteFooter.address = nextContent.siteFooter.address ?? defaultAddress;
  return nextContent;
}

export default function ContentDashboard({ currentAdmin }) {
  const [content, setContent] = useState(null);
  const [lastSavedContent, setLastSavedContent] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [savedAt, setSavedAt] = useState("");
  const [mediaItems, setMediaItems] = useState([]);
  const [mediaStatus, setMediaStatus] = useState("idle");
  const [mediaMessage, setMediaMessage] = useState("");
  const [mediaModal, setMediaModal] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [adminStatus, setAdminStatus] = useState("idle");
  const [adminMessage, setAdminMessage] = useState("");
  const [adminForm, setAdminForm] = useState(blankAdminForm);
  const [editingAdminId, setEditingAdminId] = useState("");
  const [logoutStatus, setLogoutStatus] = useState("idle");

  const loadMedia = async () => {
    try {
      setMediaStatus("loading");
      const response = await fetch("/api/uploads", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "تعذر تحميل المعرض.");
      }

      setMediaItems(data.media ?? []);
      setMediaStatus("idle");
      setMediaMessage("");
    } catch (error) {
      setMediaStatus("error");
      setMediaMessage(error.message);
    }
  };

  const loadAdmins = async () => {
    try {
      setAdminStatus("loading");
      const response = await fetch("/api/admins", { cache: "no-store" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "تعذر تحميل بيانات الأدمن.");
      }

      setAdmins(data.admins ?? []);
      setAdminStatus("idle");
      setAdminMessage("");
    } catch (error) {
      setAdminStatus("error");
      setAdminMessage(error.message);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    async function loadContent() {
      try {
        setStatus("loading");
        const response = await fetch("/api/content", {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message ?? "تعذر تحميل المحتوى.");
        }

        const normalized = normalizeContent(data.content);
        setContent(normalized);
        setLastSavedContent(cloneContent(normalized));
        setStatus("idle");
        setMessage("");
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setStatus("error");
        setMessage(error.message);
      }
    }

    loadContent();
    loadMedia();
    loadAdmins();

    return () => controller.abort();
  }, []);

  const activeTabMeta = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];
  const displayedCurrentAdmin =
    admins.find((admin) => admin.id === currentAdmin?.id) ?? currentAdmin;
  const hasChanges = useMemo(() => {
    if (!content || !lastSavedContent) {
      return false;
    }

    return JSON.stringify(content) !== JSON.stringify(lastSavedContent);
  }, [content, lastSavedContent]);

  const valueAt = (path) => getByPath(content, path) ?? "";
  const arrayAt = (path) => {
    const value = getByPath(content, path);
    return Array.isArray(value) ? value : [];
  };

  const updateField = (path, value) => {
    setContent((current) => setByPath(current, path, value));
  };

  const addArrayItem = (path, item) => {
    setContent((current) => {
      const currentItems = getByPath(current, path);
      const nextItems = Array.isArray(currentItems) ? [...currentItems, cloneContent(item)] : [cloneContent(item)];
      return setByPath(current, path, nextItems);
    });
  };

  const removeArrayItem = (path, index) => {
    setContent((current) => {
      const currentItems = getByPath(current, path);

      if (!Array.isArray(currentItems)) {
        return current;
      }

      return setByPath(
        current,
        path,
        currentItems.filter((_, itemIndex) => itemIndex !== index),
      );
    });
  };

  const handleSave = async () => {
    if (!content) {
      return;
    }

    try {
      setStatus("saving");
      setMessage("");

      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "تعذر حفظ المحتوى.");
      }

      const normalized = normalizeContent(data.content);
      setContent(normalized);
      setLastSavedContent(cloneContent(normalized));
      setStatus("saved");
      setMessage(data.message ?? "تم حفظ المحتوى.");
      setSavedAt(data.savedAt ?? "");
      showSaveToast(data.message ?? "تم حفظ المحتوى بنجاح.");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  const uploadMediaFile = async (file) => {
    try {
      setMediaStatus("uploading");
      setMediaMessage("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "تعذر رفع الملف.");
      }

      await loadMedia();
      setMediaStatus("idle");
      setMediaMessage("تم رفع الملف بنجاح.");
      return data.url;
    } catch (error) {
      setMediaStatus("error");
      setMediaMessage(error.message);
      throw error;
    }
  };

  const deleteMediaItem = async (url) => {
    const confirmed = await confirmDelete("حذف الملف؟", "سيتم حذف الملف نهائياً من المعرض.");

    if (!confirmed) {
      return;
    }

    try {
      setMediaStatus("deleting");
      setMediaMessage("");

      const response = await fetch(`/api/uploads?url=${encodeURIComponent(url)}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "تعذر حذف الملف.");
      }

      setMediaItems((currentItems) => currentItems.filter((item) => item.url !== url));
      setMediaStatus("idle");
      setMediaMessage(data.message ?? "تم حذف الملف.");
    } catch (error) {
      setMediaStatus("error");
      setMediaMessage(error.message);
    }
  };

  const openMediaPicker = ({ title, onSelect }) => {
    setMediaModal({ title, onSelect });
    loadMedia();
  };

  const selectMediaItem = (url) => {
    mediaModal?.onSelect(url);
    setMediaModal(null);
  };

  const updateAdminFormField = (field, value) => {
    setAdminForm((current) => ({ ...current, [field]: value }));
  };

  const resetAdminForm = () => {
    setEditingAdminId("");
    setAdminForm(blankAdminForm);
  };

  const startEditAdmin = (admin) => {
    setEditingAdminId(admin.id);
    setAdminForm({
      name: admin.name ?? "",
      email: admin.email ?? "",
      password: "",
    });
    setAdminMessage("");
  };

  const handleAdminSubmit = async (event) => {
    event.preventDefault();

    try {
      setAdminStatus("saving");
      setAdminMessage("");

      const isEditing = Boolean(editingAdminId);
      const response = await fetch(
        isEditing ? `/api/admins/${editingAdminId}` : "/api/admins",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(adminForm),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "تعذر حفظ بيانات الأدمن.");
      }

      await loadAdmins();
      resetAdminForm();
      setAdminStatus("saved");
      setAdminMessage(data.message ?? "تم حفظ بيانات الأدمن.");
      showSaveToast(data.message ?? "تم حفظ بيانات الأدمن بنجاح.");
    } catch (error) {
      setAdminStatus("error");
      setAdminMessage(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      setLogoutStatus("loading");
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.href = "/br-admin";
    }
  };

  const renderSectionHeaderEditor = (basePath) => (
    <DashboardPanel title="رأس القسم" icon={FileText}>
      <FormGrid>
        <Field
          label="النص العلوي"
          value={valueAt([...basePath, "header", "eyebrow"])}
          onChange={(value) => updateField([...basePath, "header", "eyebrow"], value)}
        />
        <Field
          label="العنوان"
          value={valueAt([...basePath, "header", "title"])}
          onChange={(value) => updateField([...basePath, "header", "title"], value)}
        />
        <Field
          label="الوصف"
          multiline
          value={valueAt([...basePath, "header", "copy"])}
          onChange={(value) => updateField([...basePath, "header", "copy"], value)}
        />
      </FormGrid>
    </DashboardPanel>
  );

  const renderCtaFields = (basePath, title) => (
    <DashboardPanel title={title} icon={Link}>
      <FormGrid>
        <Field
          label="نص الزر"
          value={valueAt([...basePath, "label"])}
          onChange={(value) => updateField([...basePath, "label"], value)}
        />
        <Field
          dir="ltr"
          label="الرابط"
          value={valueAt([...basePath, "href"])}
          onChange={(value) => updateField([...basePath, "href"], value)}
        />
      </FormGrid>
    </DashboardPanel>
  );

  const renderBrandAssetsPanel = () => (
    <DashboardPanel title="اللوغو والـ favicon" icon={Image}>
      <FormGrid>
        <MediaUrlField
          dir="ltr"
          label="رابط ملف اللوغو"
          value={valueAt(["brand", "logo", "src"])}
          onChange={(value) => updateField(["brand", "logo", "src"], value)}
          onOpenGallery={() =>
            openMediaPicker({
              title: "اختيار اللوغو من المعرض",
              onSelect: (url) => updateField(["brand", "logo", "src"], url),
            })
          }
        />
        <Field
          label="النص البديل للوغو"
          value={valueAt(["brand", "logo", "alt"])}
          onChange={(value) => updateField(["brand", "logo", "alt"], value)}
        />
        <UploadField
          label="رفع اللوغو"
          previewAlt={valueAt(["brand", "logo", "alt"])}
          previewSrc={valueAt(["brand", "logo", "src"])}
          uploadFile={uploadMediaFile}
          onUploaded={(url) => updateField(["brand", "logo", "src"], url)}
        />
        <MediaUrlField
          dir="ltr"
          label="رابط ملف favicon"
          value={valueAt(["layout", "metadata", "icons", "icon"])}
          onChange={(value) => updateField(["layout", "metadata", "icons", "icon"], value)}
          onOpenGallery={() =>
            openMediaPicker({
              title: "اختيار favicon من المعرض",
              onSelect: (url) => updateField(["layout", "metadata", "icons", "icon"], url),
            })
          }
        />
        <UploadField
          accept="image/*,.ico"
          label="رفع favicon"
          previewAlt="favicon"
          previewSrc={valueAt(["layout", "metadata", "icons", "icon"])}
          uploadFile={uploadMediaFile}
          onUploaded={(url) => updateField(["layout", "metadata", "icons", "icon"], url)}
        />
      </FormGrid>
    </DashboardPanel>
  );

  const renderContactAddressPanel = () => (
    <DashboardPanel title="بيانات الاتصال والعنوان" icon={PhoneCall}>
      <ArrayEditor
        addLabel="إضافة وسيلة تواصل"
        addOptions={getAvailablePresetOptions(
          arrayAt(["siteFooter", "contacts"]),
          contactMethodPresets,
        )}
        items={arrayAt(["siteFooter", "contacts"])}
        onAddOption={(preset) => addArrayItem(["siteFooter", "contacts"], preset)}
        onRemove={(index) => removeArrayItem(["siteFooter", "contacts"], index)}
        title="وسائل التواصل"
        getItemTitle={(item) => item.label || item.value || "وسيلة تواصل"}
        renderItem={(item, index) => (
          <FormGrid>
            <PresetIdentity
              icon={item.icon}
              label="وسيلة التواصل"
              value={item.label}
            />
            <Field
              dir="ltr"
              label="القيمة"
              value={item.value}
              onChange={(value) => updateField(["siteFooter", "contacts", index, "value"], value)}
            />
            <Field
              dir="ltr"
              label="الرابط"
              value={item.href}
              onChange={(value) => updateField(["siteFooter", "contacts", index, "href"], value)}
            />
            <ToggleField
              checked={Boolean(item.external)}
              label="فتح في تبويب جديد"
              onChange={(value) => updateField(["siteFooter", "contacts", index, "external"], value)}
            />
          </FormGrid>
        )}
      />

      <div className="mt-6 border-t border-slate-200 pt-6">
        <FormGrid>
          <Field
            label="عنوان المكتب"
            value={valueAt(["siteFooter", "address", "value"])}
            onChange={(value) => updateField(["siteFooter", "address", "value"], value)}
          />
          <Field
            label="تسمية العنوان"
            value={valueAt(["siteFooter", "address", "label"])}
            onChange={(value) => updateField(["siteFooter", "address", "label"], value)}
          />
          <Field
            dir="ltr"
            label="رابط الخريطة"
            value={valueAt(["siteFooter", "address", "href"])}
            onChange={(value) => updateField(["siteFooter", "address", "href"], value)}
          />
          <SelectField
            label="أيقونة العنوان"
            options={iconOptions.contacts}
            value={valueAt(["siteFooter", "address", "icon"])}
            onChange={(value) => updateField(["siteFooter", "address", "icon"], value)}
          />
          <ToggleField
            checked={Boolean(valueAt(["siteFooter", "address", "external"]))}
            label="فتح الخريطة في تبويب جديد"
            onChange={(value) => updateField(["siteFooter", "address", "external"], value)}
          />
        </FormGrid>
      </div>
    </DashboardPanel>
  );

  const renderSocialLinksPanel = () => (
    <DashboardPanel title="روابط السوشيال" icon={Globe}>
      <ArrayEditor
        addLabel="إضافة رابط"
        addOptions={getAvailablePresetOptions(
          arrayAt(["siteFooter", "socialLinks"]),
          socialPlatformPresets,
        )}
        items={arrayAt(["siteFooter", "socialLinks"])}
        onAddOption={(preset) => addArrayItem(["siteFooter", "socialLinks"], preset)}
        onRemove={(index) => removeArrayItem(["siteFooter", "socialLinks"], index)}
        title="حسابات التواصل"
        getItemTitle={(item) => item.label || "حساب جديد"}
        renderItem={(item, index) => (
          <FormGrid>
            <PresetIdentity icon={item.icon} label="المنصة" value={item.label} />
            <Field
              dir="ltr"
              label="القيمة"
              value={item.value}
              onChange={(value) => updateField(["siteFooter", "socialLinks", index, "value"], value)}
            />
            <Field
              dir="ltr"
              label="الرابط"
              value={item.href}
              onChange={(value) => updateField(["siteFooter", "socialLinks", index, "href"], value)}
            />
          </FormGrid>
        )}
      />
    </DashboardPanel>
  );

  const renderGeneralPanel = () => (
    <PanelStack>
      <DashboardPanel title="بيانات الموقع والعلامة" icon={Settings}>
        <FormGrid>
          <Field
            label="عنوان المتصفح"
            value={valueAt(["layout", "metadata", "title"])}
            onChange={(value) => updateField(["layout", "metadata", "title"], value)}
          />
          <Field
            label="وصف الميتا"
            multiline
            value={valueAt(["layout", "metadata", "description"])}
            onChange={(value) => updateField(["layout", "metadata", "description"], value)}
          />
          <Field
            label="اسم العلامة بالعربية"
            value={valueAt(["brand", "arabicName"])}
            onChange={(value) => updateField(["brand", "arabicName"], value)}
          />
          <Field
            dir="ltr"
            label="اسم العلامة بالإنجليزية"
            value={valueAt(["brand", "englishName"])}
            onChange={(value) => updateField(["brand", "englishName"], value)}
          />
          <Field
            dir="ltr"
            label="رابط الشعار"
            value={valueAt(["brand", "href"])}
            onChange={(value) => updateField(["brand", "href"], value)}
          />
        </FormGrid>
      </DashboardPanel>

      {renderBrandAssetsPanel()}

      {renderSocialLinksPanel()}
    </PanelStack>
  );

  const renderBrandPanel = () => (
    <PanelStack>
      <DashboardPanel title="الهوية الأساسية" icon={Sparkles}>
        <FormGrid>
          <Field
            label="اسم العلامة بالعربية"
            value={valueAt(["brand", "arabicName"])}
            onChange={(value) => updateField(["brand", "arabicName"], value)}
          />
          <Field
            dir="ltr"
            label="اسم العلامة بالإنجليزية"
            value={valueAt(["brand", "englishName"])}
            onChange={(value) => updateField(["brand", "englishName"], value)}
          />
          <Field
            dir="ltr"
            label="رابط الشعار"
            value={valueAt(["brand", "href"])}
            onChange={(value) => updateField(["brand", "href"], value)}
          />
        </FormGrid>
      </DashboardPanel>
      {renderBrandAssetsPanel()}
    </PanelStack>
  );

  const renderHeaderPanel = () => (
    <PanelStack>
      <DashboardPanel title="روابط الهيدر" icon={Navigation}>
        <ArrayEditor
          addLabel="إضافة رابط"
          items={arrayAt(["siteHeader", "navLinks"])}
          onAdd={() => addArrayItem(["siteHeader", "navLinks"], blankItems.navLink)}
          onRemove={(index) => removeArrayItem(["siteHeader", "navLinks"], index)}
          title="القائمة الرئيسية"
          getItemTitle={(item) => item.label || "رابط جديد"}
          renderItem={(item, index) => (
            <FormGrid>
              <Field
                label="نص الرابط"
                value={item.label}
                onChange={(value) => updateField(["siteHeader", "navLinks", index, "label"], value)}
              />
              <Field
                dir="ltr"
                label="الرابط"
                value={item.href}
                onChange={(value) => updateField(["siteHeader", "navLinks", index, "href"], value)}
              />
            </FormGrid>
          )}
        />
      </DashboardPanel>
      {renderCtaFields(["siteHeader", "cta"], "زر الهيدر")}
    </PanelStack>
  );

  const renderHeroPanel = () => (
    <PanelStack>
      <DashboardPanel title="العنوان الرئيسي" icon={Home}>
        <FormGrid>
          <Field
            label="قبل التمييز"
            value={valueAt(["hero", "title", "beforeHighlight"])}
            onChange={(value) => updateField(["hero", "title", "beforeHighlight"], value)}
          />
          <Field
            label="النص المميز"
            value={valueAt(["hero", "title", "highlight"])}
            onChange={(value) => updateField(["hero", "title", "highlight"], value)}
          />
          <Field
            label="بعد التمييز"
            value={valueAt(["hero", "title", "afterHighlight"])}
            onChange={(value) => updateField(["hero", "title", "afterHighlight"], value)}
          />
          <Field
            label="النص التعريفي"
            multiline
            value={valueAt(["hero", "copy"])}
            onChange={(value) => updateField(["hero", "copy"], value)}
          />
        </FormGrid>
      </DashboardPanel>

      <div className="grid gap-6 xl:grid-cols-2">
        {renderCtaFields(["hero", "primaryCta"], "الزر الأساسي")}
        {renderCtaFields(["hero", "secondaryCta"], "الزر الثانوي")}
      </div>

      <DashboardPanel title="بطاقات الهيرو" icon={Blocks}>
        <ArrayEditor
          addLabel="إضافة بطاقة"
          items={arrayAt(["hero", "highlights"])}
          onAdd={() => addArrayItem(["hero", "highlights"], blankItems.highlight)}
          onRemove={(index) => removeArrayItem(["hero", "highlights"], index)}
          title="البطاقات"
          getItemTitle={(item) => item.title || "بطاقة جديدة"}
          renderItem={(item, index) => (
            <FormGrid>
              <SelectField
                label="الأيقونة"
                options={iconOptions.highlights}
                value={item.icon}
                onChange={(value) => updateField(["hero", "highlights", index, "icon"], value)}
              />
              <Field
                label="العنوان"
                value={item.title}
                onChange={(value) => updateField(["hero", "highlights", index, "title"], value)}
              />
              <Field
                label="الوصف"
                multiline
                value={item.copy}
                onChange={(value) => updateField(["hero", "highlights", index, "copy"], value)}
              />
            </FormGrid>
          )}
        />
      </DashboardPanel>

      <DashboardPanel title="إحصاءات الهيرو" icon={BarChart3}>
        <ArrayEditor
          addLabel="إضافة مؤشر"
          items={arrayAt(["hero", "stats"])}
          onAdd={() => addArrayItem(["hero", "stats"], blankItems.stat)}
          onRemove={(index) => removeArrayItem(["hero", "stats"], index)}
          title="المؤشرات"
          getItemTitle={(item) => item.value || item.label || "مؤشر جديد"}
          renderItem={(item, index) => (
            <FormGrid>
              <Field
                dir="ltr"
                label="القيمة"
                value={item.value}
                onChange={(value) => updateField(["hero", "stats", index, "value"], value)}
              />
              <Field
                label="الوصف"
                value={item.label}
                onChange={(value) => updateField(["hero", "stats", index, "label"], value)}
              />
            </FormGrid>
          )}
        />
      </DashboardPanel>
    </PanelStack>
  );

  const renderProblemsPanel = () => (
    <PanelStack>
      {renderSectionHeaderEditor(["problems"])}
      <DashboardPanel title="بطاقات المشكلة" icon={MousePointerClick}>
        <ArrayEditor
          addLabel="إضافة بطاقة"
          items={arrayAt(["problems", "items"])}
          onAdd={() => addArrayItem(["problems", "items"], blankItems.problem)}
          onRemove={(index) => removeArrayItem(["problems", "items"], index)}
          title="المشكلات"
          getItemTitle={(item) => item.title || "مشكلة جديدة"}
          renderItem={(item, index) => (
            <FormGrid>
              <SelectField
                label="الأيقونة"
                options={iconOptions.problems}
                value={item.icon}
                onChange={(value) => updateField(["problems", "items", index, "icon"], value)}
              />
              <Field
                label="العنوان"
                value={item.title}
                onChange={(value) => updateField(["problems", "items", index, "title"], value)}
              />
              <Field
                label="الوصف"
                multiline
                value={item.copy}
                onChange={(value) => updateField(["problems", "items", index, "copy"], value)}
              />
            </FormGrid>
          )}
        />
      </DashboardPanel>
    </PanelStack>
  );

  const renderProcessPanel = () => (
    <PanelStack>
      <DashboardPanel title="محتوى المنهجية" icon={Target}>
        <FormGrid>
          <Field
            label="عنوان اللوحة"
            value={valueAt(["process", "panelTitle"])}
            onChange={(value) => updateField(["process", "panelTitle"], value)}
          />
          <Field
            label="النص العلوي"
            value={valueAt(["process", "eyebrow"])}
            onChange={(value) => updateField(["process", "eyebrow"], value)}
          />
          <Field
            label="العنوان"
            value={valueAt(["process", "title"])}
            onChange={(value) => updateField(["process", "title"], value)}
          />
          <Field
            label="الوصف"
            multiline
            value={valueAt(["process", "copy"])}
            onChange={(value) => updateField(["process", "copy"], value)}
          />
        </FormGrid>
      </DashboardPanel>
      {renderCtaFields(["process", "cta"], "رابط المنهجية")}
      <DashboardPanel title="خطوات المنهجية" icon={CheckCircle2}>
        <ArrayEditor
          addLabel="إضافة خطوة"
          items={arrayAt(["process", "items"])}
          onAdd={() => addArrayItem(["process", "items"], blankItems.process)}
          onRemove={(index) => removeArrayItem(["process", "items"], index)}
          title="الخطوات"
          getItemTitle={(item) => item.title || "خطوة جديدة"}
          renderItem={(item, index) => (
            <FormGrid>
              <Field
                label="العنوان"
                value={item.title}
                onChange={(value) => updateField(["process", "items", index, "title"], value)}
              />
              <Field
                label="الوصف"
                multiline
                value={item.copy}
                onChange={(value) => updateField(["process", "items", index, "copy"], value)}
              />
            </FormGrid>
          )}
        />
      </DashboardPanel>
    </PanelStack>
  );

  const renderPhilosophyPanel = () => (
    <PanelStack>
      <DashboardPanel title="اقتباس الفلسفة" icon={Quote}>
        <FormGrid>
          <Field
            label="النص العلوي"
            value={valueAt(["philosophy", "eyebrow"])}
            onChange={(value) => updateField(["philosophy", "eyebrow"], value)}
          />
          <Field
            label="قبل التمييز"
            value={valueAt(["philosophy", "quote", "beforeHighlight"])}
            onChange={(value) => updateField(["philosophy", "quote", "beforeHighlight"], value)}
          />
          <Field
            label="النص المميز"
            value={valueAt(["philosophy", "quote", "highlight"])}
            onChange={(value) => updateField(["philosophy", "quote", "highlight"], value)}
          />
          <Field
            label="بعد التمييز"
            value={valueAt(["philosophy", "quote", "afterHighlight"])}
            onChange={(value) => updateField(["philosophy", "quote", "afterHighlight"], value)}
          />
        </FormGrid>
      </DashboardPanel>
    </PanelStack>
  );

  const renderServicesPanel = () => (
    <PanelStack>
      {renderSectionHeaderEditor(["services"])}
      <DashboardPanel title="الخدمات" icon={PaintBucket}>
        <ArrayEditor
          addLabel="إضافة خدمة"
          items={arrayAt(["services", "items"])}
          onAdd={() => addArrayItem(["services", "items"], blankItems.service)}
          onRemove={(index) => removeArrayItem(["services", "items"], index)}
          title="قائمة الخدمات"
          getItemTitle={(item) => item.title || "خدمة جديدة"}
          renderItem={(item, index) => (
            <FormGrid>
              <SelectField
                label="الأيقونة"
                options={iconOptions.services}
                value={item.icon}
                onChange={(value) => updateField(["services", "items", index, "icon"], value)}
              />
              <Field
                label="العنوان"
                value={item.title}
                onChange={(value) => updateField(["services", "items", index, "title"], value)}
              />
              <Field
                label="الوصف"
                multiline
                value={item.copy}
                onChange={(value) => updateField(["services", "items", index, "copy"], value)}
              />
            </FormGrid>
          )}
        />
      </DashboardPanel>
    </PanelStack>
  );

  const renderProjectsPanel = () => (
    <PanelStack>
      {renderSectionHeaderEditor(["projects"])}
      <DashboardPanel title="إعدادات الأعمال" icon={Image}>
        <FormGrid>
          <Field
            label="تسمية فلتر الكل"
            value={valueAt(["projects", "allFilterLabel"])}
            onChange={(value) => updateField(["projects", "allFilterLabel"], value)}
          />
        </FormGrid>
      </DashboardPanel>
      <DashboardPanel title="الأعمال" icon={Blocks}>
        <ArrayEditor
          addLabel="إضافة مشروع"
          items={arrayAt(["projects", "items"])}
          onAdd={() => addArrayItem(["projects", "items"], blankItems.project)}
          onRemove={(index) => removeArrayItem(["projects", "items"], index)}
          title="قائمة الأعمال"
          getItemTitle={(item) => item.title || "مشروع جديد"}
          renderItem={(item, index) => (
            <FormGrid>
              <Field
                label="التصنيف"
                value={item.domain}
                onChange={(value) => updateField(["projects", "items", index, "domain"], value)}
              />
              <Field
                label="اسم المشروع"
                value={item.title}
                onChange={(value) => updateField(["projects", "items", index, "title"], value)}
              />
              <MediaUrlField
                dir="ltr"
                label="رابط الصورة"
                value={item.image}
                onChange={(value) => updateField(["projects", "items", index, "image"], value)}
                onOpenGallery={() =>
                  openMediaPicker({
                    title: "اختيار صورة المشروع من المعرض",
                    onSelect: (url) => updateField(["projects", "items", index, "image"], url),
                  })
                }
              />
              <Field
                label="النتيجة"
                value={item.result}
                onChange={(value) => updateField(["projects", "items", index, "result"], value)}
              />
              <Field
                dir="ltr"
                label="خلفية التدرج"
                multiline
                value={item.background}
                onChange={(value) => updateField(["projects", "items", index, "background"], value)}
              />
            </FormGrid>
          )}
        />
      </DashboardPanel>
    </PanelStack>
  );

  const renderGalleryPanel = () => (
    <PanelStack>
      <DashboardPanel title="المعرض" icon={Image}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-slate-500">
              كل الوسائط التي تم رفعها إلى public/upload.
            </p>
            {mediaMessage ? (
              <p
                className={`mt-1 text-sm font-bold ${
                  mediaStatus === "error" ? "text-red-600" : "text-slate-500"
                }`}
              >
                {mediaMessage}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
              onClick={loadMedia}
              type="button"
            >
              <RotateCcw className="h-4 w-4" />
              تحديث
            </button>
            <MediaUploadButton uploadFile={uploadMediaFile} />
          </div>
        </div>

        <MediaGalleryGrid
          items={mediaItems}
          status={mediaStatus}
          onDelete={deleteMediaItem}
        />
      </DashboardPanel>
    </PanelStack>
  );

  const renderAdminsPanel = () => {
    const isEditing = Boolean(editingAdminId);

    return (
      <PanelStack>
        <DashboardPanel title={isEditing ? "تعديل بيانات الأدمن" : "إضافة أدمن"} icon={UserCog}>
          <form className="space-y-5" onSubmit={handleAdminSubmit}>
            <FormGrid>
              <Field
                label="الاسم"
                value={adminForm.name}
                onChange={(value) => updateAdminFormField("name", value)}
              />
              <Field
                dir="ltr"
                label="الإيميل"
                type="email"
                value={adminForm.email}
                onChange={(value) => updateAdminFormField("email", value)}
              />
              <Field
                dir="ltr"
                label={isEditing ? "كلمة مرور جديدة (اختياري)" : "كلمة المرور"}
                type="password"
                value={adminForm.password}
                onChange={(value) => updateAdminFormField("password", value)}
              />
            </FormGrid>

            {adminMessage ? (
              <AdminStatusNotice status={adminStatus} message={adminMessage} />
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <button
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 text-sm font-extrabold text-white shadow-sm hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-45"
                disabled={adminStatus === "saving"}
                type="submit"
              >
                {adminStatus === "saving" ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isEditing ? "حفظ التعديل" : "إضافة أدمن"}
              </button>

              {isEditing ? (
                <button
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
                  onClick={resetAdminForm}
                  type="button"
                >
                  <X className="h-4 w-4" />
                  إلغاء
                </button>
              ) : null}
            </div>
          </form>
        </DashboardPanel>

        <DashboardPanel title="حسابات الأدمن" icon={Users}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-slate-500">
                عدد الحسابات: {admins.length}
              </p>
            </div>
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
              onClick={loadAdmins}
              type="button"
            >
              <RotateCcw className="h-4 w-4" />
              تحديث
            </button>
          </div>

          {adminStatus === "loading" && !admins.length ? (
            <div className="flex min-h-32 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                <LoaderCircle className="h-5 w-5 animate-spin text-blue-700" />
                جاري تحميل حسابات الأدمن
              </div>
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {admins.map((admin) => {
                const isCurrentAdmin = admin.id === currentAdmin?.id;

                return (
                  <article
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                    key={admin.id}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-extrabold text-slate-950">
                            {admin.name || admin.email}
                          </h3>
                          {isCurrentAdmin ? (
                            <span className="inline-flex h-7 items-center rounded-lg bg-emerald-50 px-2 text-xs font-extrabold text-emerald-700">
                              الحساب الحالي
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 truncate text-sm font-bold text-slate-600" dir="ltr">
                          {admin.email}
                        </p>
                        {admin.updatedAt ? (
                          <p className="mt-2 text-xs font-bold text-slate-500">
                            آخر تحديث: {new Date(admin.updatedAt).toLocaleString("ar-EG")}
                          </p>
                        ) : null}
                      </div>

                      <button
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
                        onClick={() => startEditAdmin(admin)}
                        type="button"
                      >
                        <Pencil className="h-4 w-4" />
                        تعديل
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </DashboardPanel>
      </PanelStack>
    );
  };

  const renderCtaPanel = () => (
    <PanelStack>
      <DashboardPanel title="محتوى قسم التواصل" icon={MessageCircleMore}>
        <FormGrid>
          <Field
            label="النص العلوي"
            value={valueAt(["cta", "eyebrow"])}
            onChange={(value) => updateField(["cta", "eyebrow"], value)}
          />
          <Field
            label="العنوان"
            value={valueAt(["cta", "title"])}
            onChange={(value) => updateField(["cta", "title"], value)}
          />
          <Field
            label="الوصف"
            multiline
            value={valueAt(["cta", "copy"])}
            onChange={(value) => updateField(["cta", "copy"], value)}
          />
        </FormGrid>
      </DashboardPanel>
      <div className="grid gap-6 xl:grid-cols-2">
        {renderCtaFields(["cta", "primaryCta"], "الزر الأساسي")}
        {renderCtaFields(["cta", "secondaryCta"], "الزر الثانوي")}
      </div>
      {renderContactAddressPanel()}
    </PanelStack>
  );

  const renderFooterPanel = () => (
    <PanelStack>
      <DashboardPanel title="محتوى الفوتر" icon={FileText}>
        <FormGrid>
          <Field
            label="الوصف"
            multiline
            value={valueAt(["siteFooter", "description"])}
            onChange={(value) => updateField(["siteFooter", "description"], value)}
          />
          <Field
            label="عنوان روابط الفوتر"
            value={valueAt(["siteFooter", "quickLinks", "title"])}
            onChange={(value) => updateField(["siteFooter", "quickLinks", "title"], value)}
          />
          <Field
            label="عنوان التواصل"
            value={valueAt(["siteFooter", "contactTitle"])}
            onChange={(value) => updateField(["siteFooter", "contactTitle"], value)}
          />
          <Field
            label="حقوق النشر"
            value={valueAt(["siteFooter", "copyright"])}
            onChange={(value) => updateField(["siteFooter", "copyright"], value)}
          />
        </FormGrid>
      </DashboardPanel>

      <DashboardPanel title="روابط الفوتر" icon={Link}>
        <ArrayEditor
          addLabel="إضافة رابط"
          items={arrayAt(["siteFooter", "quickLinks", "links"])}
          onAdd={() => addArrayItem(["siteFooter", "quickLinks", "links"], blankItems.quickLink)}
          onRemove={(index) => removeArrayItem(["siteFooter", "quickLinks", "links"], index)}
          title="الروابط السريعة"
          getItemTitle={(item) => item.label || "رابط جديد"}
          renderItem={(item, index) => (
            <FormGrid>
              <Field
                label="نص الرابط"
                value={item.label}
                onChange={(value) => updateField(["siteFooter", "quickLinks", "links", index, "label"], value)}
              />
              <Field
                dir="ltr"
                label="الرابط"
                value={item.href}
                onChange={(value) => updateField(["siteFooter", "quickLinks", "links", index, "href"], value)}
              />
            </FormGrid>
          )}
        />
      </DashboardPanel>

      {renderContactAddressPanel()}
      {renderSocialLinksPanel()}
    </PanelStack>
  );

  const renderActivePanel = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralPanel();
      case "gallery":
        return renderGalleryPanel();
      case "admins":
        return renderAdminsPanel();
      case "brand":
        return renderBrandPanel();
      case "header":
        return renderHeaderPanel();
      case "hero":
        return renderHeroPanel();
      case "problems":
        return renderProblemsPanel();
      case "process":
        return renderProcessPanel();
      case "philosophy":
        return renderPhilosophyPanel();
      case "services":
        return renderServicesPanel();
      case "projects":
        return renderProjectsPanel();
      case "cta":
        return renderCtaPanel();
      case "footer":
        return renderFooterPanel();
      default:
        return renderGeneralPanel();
    }
  };

  if (status === "loading" || !content) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5 text-slate-950">
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <LoaderCircle className="h-5 w-5 animate-spin text-blue-700" />
          <span className="text-sm font-bold">جاري تحميل لوحة التحكم</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="border-l border-slate-800 bg-slate-950 text-white lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
          <div className="flex min-h-20 items-center gap-3 border-b border-white/10 px-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-extrabold">لوحة المحتوى</p>
              <p className="text-xs font-bold text-slate-400">Brief Agency</p>
            </div>
          </div>

          <nav className="flex gap-2 overflow-x-auto px-4 py-4 lg:block lg:space-y-1 lg:overflow-visible">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  className={`flex h-11 shrink-0 items-center gap-3 rounded-lg px-3 text-sm font-bold lg:w-full ${
                    isActive
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-300 hover:bg-white/8 hover:text-white"
                  }`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/92 px-5 py-4 backdrop-blur-xl lg:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm font-bold text-blue-700">إدارة محتوى الموقع</p>
                <h1 className="mt-1 text-2xl font-extrabold text-slate-950">
                  {activeTabMeta.label}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {activeTab === "admins" ? (
                  <AdminStatusBadge status={adminStatus} message={adminMessage} />
                ) : (
                  <StatusBadge status={status} hasChanges={hasChanges} message={message} />
                )}
                {displayedCurrentAdmin ? (
                  <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-700">
                    <ShieldCheck className="h-4 w-4 text-blue-700" />
                    <span className="max-w-52 truncate">
                      {displayedCurrentAdmin.name || displayedCurrentAdmin.email}
                    </span>
                  </span>
                ) : null}
                <a
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
                  href="/"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Home className="h-4 w-4" />
                  الموقع
                </a>
                <button
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm hover:border-red-200 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-45"
                  disabled={logoutStatus === "loading"}
                  onClick={handleLogout}
                  type="button"
                >
                  {logoutStatus === "loading" ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4" />
                  )}
                  خروج
                </button>
                {activeTab !== "admins" ? (
                  <button
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 text-sm font-extrabold text-white shadow-sm hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-45"
                    disabled={!hasChanges || status === "saving"}
                    onClick={handleSave}
                    type="button"
                  >
                    {status === "saving" ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    حفظ
                  </button>
                ) : null}
              </div>
            </div>
            {savedAt && activeTab !== "admins" ? (
              <p className="mt-3 text-xs font-bold text-slate-500" dir="ltr">
                {new Date(savedAt).toLocaleString("ar-EG")}
              </p>
            ) : null}
          </header>

          <div className="px-5 py-6 lg:px-8 lg:py-8">{renderActivePanel()}</div>
        </section>
      </div>
      {mediaModal ? (
        <MediaPickerModal
          items={mediaItems}
          mediaMessage={mediaMessage}
          status={mediaStatus}
          title={mediaModal.title}
          uploadFile={uploadMediaFile}
          onClose={() => setMediaModal(null)}
          onDelete={deleteMediaItem}
          onRefresh={loadMedia}
          onSelect={selectMediaItem}
        />
      ) : null}
    </main>
  );
}

function StatusBadge({ status, hasChanges, message }) {
  if (status === "error") {
    return (
      <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 text-sm font-bold text-red-700">
        <AlertCircle className="h-4 w-4" />
        {message || "حدث خطأ"}
      </span>
    );
  }

  if (status === "saved") {
    return (
      <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-sm font-bold text-emerald-700">
        <CheckCircle2 className="h-4 w-4" />
        {message || "تم الحفظ"}
      </span>
    );
  }

  if (hasChanges) {
    return (
      <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 text-sm font-bold text-amber-700">
        <AlertCircle className="h-4 w-4" />
        تغييرات غير محفوظة
      </span>
    );
  }

  return (
    <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-600">
      <CheckCircle2 className="h-4 w-4" />
      محفوظ
    </span>
  );
}

function AdminStatusBadge({ status, message }) {
  if (status === "error") {
    return (
      <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 text-sm font-bold text-red-700">
        <AlertCircle className="h-4 w-4" />
        {message || "حدث خطأ"}
      </span>
    );
  }

  if (status === "saved") {
    return (
      <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-sm font-bold text-emerald-700">
        <CheckCircle2 className="h-4 w-4" />
        {message || "تم حفظ بيانات الأدمن"}
      </span>
    );
  }

  if (status === "loading" || status === "saving") {
    return (
      <span className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-sm font-bold text-blue-700">
        <LoaderCircle className="h-4 w-4 animate-spin" />
        {status === "saving" ? "جاري الحفظ" : "جاري التحميل"}
      </span>
    );
  }

  return null;
}

function AdminStatusNotice({ status, message }) {
  const isError = status === "error";

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-3 text-sm font-bold ${
        isError
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700"
      }`}
    >
      {isError ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
      {message}
    </div>
  );
}

function PanelStack({ children }) {
  return <div className="space-y-6">{children}</div>;
}

function DashboardPanel({ title, icon: Icon, children }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-lg font-extrabold text-slate-950">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function FormGrid({ children }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function Field({ label, value, onChange, multiline = false, type = "text", dir = "rtl" }) {
  const fieldClass =
    "mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-900 outline-none shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <label className={multiline ? "md:col-span-2" : undefined}>
      <span className="text-sm font-extrabold text-slate-700">{label}</span>
      {multiline ? (
        <textarea
          className={`${fieldClass} min-h-28 resize-y leading-7`}
          dir={dir}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className={fieldClass}
          dir={dir}
          type={type}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function MediaUrlField({ label, value, onChange, onOpenGallery, dir = "ltr" }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-extrabold text-slate-700">{label}</span>
        <button
          aria-label={`فتح المعرض لاختيار ${label}`}
          className="inline-flex h-8 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-xs font-extrabold text-blue-700 hover:bg-blue-100"
          onClick={onOpenGallery}
          type="button"
        >
          <Image className="h-4 w-4" />
          المعرض
        </button>
      </div>
      <input
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-900 outline-none shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        dir={dir}
        type="text"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

function SelectField({ label, options, value, onChange }) {
  const currentValue = value ?? options[0];

  return (
    <div>
      <span className="text-sm font-extrabold text-slate-700">{label}</span>
      <div
        aria-label={label}
        className="mt-2 grid grid-cols-5 gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm"
        role="radiogroup"
      >
        {options.map((option) => (
          <IconOptionButton
            isActive={currentValue === option}
            key={option}
            label={option}
            onClick={() => onChange(option)}
          />
        ))}
      </div>
    </div>
  );
}

function IconOptionButton({ isActive, label, onClick }) {
  const Icon = dashboardIconComponents[label];

  return (
    <button
      aria-label={label}
      aria-pressed={isActive}
      className={`flex h-11 items-center justify-center rounded-lg border text-slate-700 outline-none focus:ring-4 focus:ring-blue-100 ${
        isActive
          ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
          : "border-transparent bg-slate-50 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      }`}
      onClick={onClick}
      title={label}
      type="button"
    >
      {Icon ? <Icon className="h-5 w-5" /> : <span className="sr-only">{label}</span>}
    </button>
  );
}

function PresetIdentity({ icon, label, value }) {
  const Icon = dashboardIconComponents[icon] ?? Globe;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-3 shadow-sm">
      <span className="text-sm font-extrabold text-slate-700">{label}</span>
      <div className="mt-3 flex min-h-10 items-center gap-3 rounded-lg bg-slate-50 px-3 text-slate-900">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-sm font-extrabold">{value}</span>
      </div>
    </div>
  );
}

async function uploadFileDirectly(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/uploads", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message ?? "تعذر رفع الملف.");
  }

  return data.url;
}

function UploadField({
  accept = "image/*,.ico",
  label,
  onUploaded,
  previewAlt,
  previewSrc,
  uploadFile,
}) {
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [uploadMessage, setUploadMessage] = useState("");

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploadStatus("uploading");
      setUploadMessage("");
      const uploadedUrl = uploadFile ? await uploadFile(file) : await uploadFileDirectly(file);

      onUploaded(uploadedUrl);
      setUploadStatus("uploaded");
      setUploadMessage("تم رفع الملف. اضغط حفظ لتثبيت التغيير.");
    } catch (error) {
      setUploadStatus("error");
      setUploadMessage(error.message);
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold text-slate-700">{label}</p>
          {uploadMessage ? (
            <p
              className={`mt-1 text-xs font-bold ${
                uploadStatus === "error" ? "text-red-600" : "text-slate-500"
              }`}
            >
              {uploadMessage}
            </p>
          ) : null}
        </div>

        {previewSrc ? (
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-slate-200 bg-white p-2">
            <img alt={previewAlt || label} className="max-h-full max-w-full object-contain" src={previewSrc} />
          </div>
        ) : null}
      </div>

      <label className="mt-4 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-200 bg-white px-4 text-sm font-extrabold text-blue-700 shadow-sm hover:bg-blue-50">
        {uploadStatus === "uploading" ? (
          <LoaderCircle className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
        اختيار ملف
        <input
          accept={accept}
          className="sr-only"
          disabled={uploadStatus === "uploading"}
          type="file"
          onChange={handleUpload}
        />
      </label>
    </div>
  );
}

function MediaUploadButton({ label = "رفع صورة جديدة", uploadFile, onUploaded }) {
  const [uploadStatus, setUploadStatus] = useState("idle");

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setUploadStatus("uploading");
      const uploadedUrl = await uploadFile(file);
      onUploaded?.(uploadedUrl);
      setUploadStatus("idle");
    } catch {
      setUploadStatus("idle");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 text-sm font-extrabold text-white shadow-sm hover:bg-blue-800">
      {uploadStatus === "uploading" ? (
        <LoaderCircle className="h-4 w-4 animate-spin" />
      ) : (
        <Upload className="h-4 w-4" />
      )}
      {label}
      <input
        accept="image/*,.ico"
        className="sr-only"
        disabled={uploadStatus === "uploading"}
        type="file"
        onChange={handleUpload}
      />
    </label>
  );
}

function MediaGalleryGrid({ items, status, onDelete, onSelect }) {
  const isLoading = status === "loading" && !items.length;

  if (isLoading) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
          <LoaderCircle className="h-5 w-5 animate-spin text-blue-700" />
          جاري تحميل المعرض
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <Image className="mx-auto h-8 w-8 text-slate-400" />
        <p className="mt-3 text-sm font-extrabold text-slate-700">لا توجد وسائط مرفوعة بعد</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
      {items.map((item) => (
        <article
          className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
          key={item.url}
        >
          <div className="flex aspect-square items-center justify-center bg-slate-100 p-3">
            <img alt={item.name} className="max-h-full max-w-full object-contain" src={item.url} />
          </div>
          <div className="space-y-3 p-3">
            <div>
              <p className="truncate text-xs font-extrabold text-slate-800" dir="ltr">
                {item.name}
              </p>
              <p className="mt-1 text-xs font-bold text-slate-500" dir="ltr">
                {formatFileSize(item.size)}
              </p>
            </div>
            <div className="flex gap-2">
              {onSelect ? (
                <button
                  className="inline-flex h-9 flex-1 items-center justify-center rounded-lg bg-blue-700 px-3 text-sm font-extrabold text-white hover:bg-blue-800"
                  onClick={() => onSelect(item.url)}
                  type="button"
                >
                  اختيار
                </button>
              ) : null}
              <button
                aria-label={`حذف ${item.name}`}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-red-200 bg-white px-3 text-sm font-bold text-red-700 hover:bg-red-50"
                onClick={() => onDelete(item.url)}
                type="button"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function MediaPickerModal({
  items,
  mediaMessage,
  onClose,
  onDelete,
  onRefresh,
  onSelect,
  status,
  title,
  uploadFile,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm">
      <section className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-sm font-bold text-blue-700">المعرض</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-950">{title}</h2>
          </div>
          <button
            aria-label="إغلاق المعرض"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="min-h-5">
            {mediaMessage ? (
              <p
                className={`text-sm font-bold ${
                  status === "error" ? "text-red-600" : "text-slate-500"
                }`}
              >
                {mediaMessage}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm hover:border-blue-200 hover:text-blue-700"
              onClick={onRefresh}
              type="button"
            >
              <RotateCcw className="h-4 w-4" />
              تحديث
            </button>
            <MediaUploadButton label="رفع صورة" uploadFile={uploadFile} />
          </div>
        </div>

        <div className="overflow-y-auto p-5">
          <MediaGalleryGrid
            items={items}
            status={status}
            onDelete={onDelete}
            onSelect={onSelect}
          />
        </div>
      </section>
    </div>
  );
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes)) {
    return "";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function InstagramIcon(props) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
      <path d="M6 10v8" />
      <path d="M11 10v8" />
      <path d="M11 13a3 3 0 0 1 6 0v5" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M13.5 21v-7h2.6l.4-3h-3V9.7c0-.9.3-1.6 1.8-1.6H16V5.4c-.3 0-.9-.1-1.8-.1-2.8 0-4.5 1.7-4.5 4.8V11H7v3h2.7v7h3.8Z" />
    </svg>
  );
}

function TiktokIcon(props) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M14 4v10.3a4.7 4.7 0 1 1-4.7-4.7" />
      <path d="M14 4c.6 3.1 2.4 5 5 5.4" />
    </svg>
  );
}

function WhatsappIcon(props) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M5.5 18.5 6.4 15A7.1 7.1 0 1 1 9 17.6l-3.5.9Z" />
      <path d="M9.5 8.8c.2 3 2.1 4.9 5.2 5.7" />
      <path d="m13.7 13.4.9.4c.5.2 1 .1 1.2-.4l.3-.7" />
      <path d="m9.5 8.8.6-.3c.5-.2.9 0 1.1.5l.3.8" />
    </svg>
  );
}

function TelegramIcon(props) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M20.5 4.5 3.8 11.2c-.9.4-.8 1.6.1 1.8l4.2 1.1 1.7 4.7c.3.8 1.3 1 1.8.3l2.4-3.1 4.2 3c.8.6 1.9.1 2.1-.9l2.1-12.3c.2-.9-.7-1.6-1.9-1.3Z" />
      <path d="m8.3 14 7.9-5.3" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M5 4l14 16" />
      <path d="M19 4L5 20" />
    </svg>
  );
}

function ToggleField({ label, checked, onChange }) {
  return (
    <label className="flex min-h-[4.75rem] items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
      <span className="text-sm font-extrabold text-slate-700">{label}</span>
      <input
        checked={checked}
        className="h-5 w-5 accent-blue-700"
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  );
}

function ArrayEditor({
  addLabel,
  addOptions,
  items,
  onAdd,
  onAddOption,
  onRemove,
  title,
  getItemTitle,
  renderItem,
}) {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const hasPresetOptions = Array.isArray(addOptions);
  const canAdd = hasPresetOptions ? addOptions.length > 0 : Boolean(onAdd);

  const handleAddClick = () => {
    if (hasPresetOptions) {
      setIsAddMenuOpen((current) => !current);
      return;
    }

    onAdd?.();
  };

  const handleAddPreset = (preset) => {
    onAddOption?.(preset);
    setIsAddMenuOpen(false);
  };

  const handleRemove = async (item, index) => {
    const confirmed = await confirmDelete(
      `حذف ${getItemTitle(item)}؟`,
      "هل أنت متأكد من الحذف؟",
    );

    if (confirmed) {
      onRemove(index);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-extrabold text-slate-950">{title}</h3>
        <div className="relative">
          <button
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 text-sm font-extrabold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-45"
            disabled={!canAdd}
            onClick={handleAddClick}
            type="button"
          >
            <Plus className="h-4 w-4" />
            {addLabel}
          </button>

          {hasPresetOptions && isAddMenuOpen ? (
            <div className="absolute left-0 top-12 z-30 w-64 overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-xl">
              {addOptions.map((option) => {
                const Icon = dashboardIconComponents[option.icon] ?? Globe;

                return (
                  <button
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-right text-sm font-extrabold text-slate-800 hover:bg-blue-50 hover:text-blue-700"
                    key={getPresetId(option)}
                    onClick={() => handleAddPreset(option)}
                    type="button"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    {option.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      <div className="space-y-4">
        {items.length ? (
          items.map((item, index) => (
            <article className="rounded-lg border border-slate-200 bg-slate-50 p-4" key={index}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold text-slate-950">{getItemTitle(item)}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">#{index + 1}</p>
                </div>
                <button
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-sm font-bold text-red-700 hover:bg-red-50"
                  onClick={() => handleRemove(item, index)}
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                  حذف
                </button>
              </div>
              {renderItem(item, index)}
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-sm font-bold text-slate-500">
            لا توجد عناصر
          </div>
        )}
      </div>
    </div>
  );
}
