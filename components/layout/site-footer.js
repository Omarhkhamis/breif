import { Globe, Mail, MapPin, MessageCircleMore, PhoneCall } from "lucide-react";
import Brand from "../home/brand";

const contactIcons = {
  Globe,
  Mail,
  MapPin,
  MessageCircleMore,
  PhoneCall,
};

const socialIcons = {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TelegramIcon,
  TiktokIcon,
  WhatsappIcon,
  XIcon,
};

export default function SiteFooter({ content, brand }) {
  return (
    <footer className="pb-10 pt-20">
      <div className="shell">
        <div className="glass-panel grid gap-10 p-8 lg:grid-cols-[1.15fr_0.7fr_1fr] lg:p-10">
          <div className="space-y-5">
            <Brand content={brand} />
            <p className="max-w-md text-base leading-8 text-slate-600">
              {content.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-950">{content.quickLinks.title}</h3>
            <div className="space-y-3">
              {content.quickLinks.links.map((link) => (
                <a
                  key={link.label}
                  className="block text-base font-medium text-slate-600 hover:text-blue-700"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-950">{content.contactTitle}</h3>

            <div className="grid gap-4">
              {[...content.contacts, content.address].filter(Boolean).map(({ icon, label, value, href, external }) => {
                const Icon = contactIcons[icon] ?? Globe;

                return (
                  <a
                    key={label}
                    aria-label={label}
                    className="flex items-center gap-3 text-slate-700 hover:text-blue-700"
                    href={href || undefined}
                    rel={external ? "noreferrer" : undefined}
                    target={external ? "_blank" : undefined}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span
                      className="truncate text-base font-extrabold text-slate-800"
                      dir={icon === "MapPin" ? "rtl" : "ltr"}
                    >
                      {value}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="pt-2">
              <div className="flex flex-wrap gap-3">
                {content.socialLinks.map(({ label, href, icon }) => {
                  const Icon = socialIcons[icon] ?? InstagramIcon;

                  return (
                    <a
                      key={label}
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-[0_16px_40px_-32px_rgba(15,23,42,0.25)] hover:border-blue-200 hover:text-blue-700"
                      href={href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-2 text-sm text-slate-500">
          <p>{content.copyright}</p>
        </div>
      </div>
    </footer>
  );
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
