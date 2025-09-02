"use client";

import MastercardNavbar from "@/components/ui/mastercard-navbar";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Updates", href: "/updates" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return <MastercardNavbar items={navigation} />;
}
