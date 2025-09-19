"use client"

export type ButtonActionType =
  | "booking"
  | "contact"
  | "learn-more"
  | "download"
  | "share"
  | "subscribe"
  | "emergency"
  | "consultation"
  | "support"
  | "navigation"
  | "form-submit"
  | "external-link"
  | "modal"
  | "scroll"
  | "filter"
  | "search";

export interface ButtonAction {
  type: ButtonActionType;
  label: string;
  handler: () => void | Promise<void>;
  analytics?: {
    event: string;
    category: string;
    label?: string;
  };
}

// Safe window access helpers for SSR compatibility
const safeNavigate = (url: string) => {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
};

const safeOpenWindow = (url: string, target: string = "_blank", features?: string) => {
  if (typeof window !== "undefined") {
    window.open(url, target, features);
  }
};

const safeScrollTo = (options: ScrollToOptions) => {
  if (typeof window !== "undefined") {
    window.scrollTo(options);
  }
};

const safeDispatchEvent = (event: CustomEvent) => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(event);
  }
};

const safeHistoryPushState = (data: any, title: string, url: string) => {
  if (typeof window !== "undefined") {
    window.history.pushState(data, title, url);
  }
};

const safeGetOrigin = (): string => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return ""; // fallback for SSR
};

// Analytics tracking function
const trackEvent = (event: string, category: string, label?: string) => {
  if (typeof window !== "undefined") {
    if ((window as any).gtag) {
      (window as any).gtag("event", event, {
        event_category: category,
        event_label: label,
      });
    }
    console.log(`Analytics: ${event} - ${category}${label ? ` - ${label}` : ""}`);
  }
};

// Notification system
const showNotification = (
  message: string,
  type: "success" | "error" | "info" = "info"
) => {
  // Implement toast notification here
  console.log(`${type.toUpperCase()}: ${message}`);

  // For now, using alert - replace with proper toast notification
  if (type === "error") {
    alert(`Error: ${message}`);
  } else if (type === "success") {
    alert(`Success: ${message}`);
  } else {
    alert(`Info: ${message}`);
  }
};

// Scroll to section function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// External link handler
const openExternalLink = (url: string, newTab: boolean = true) => {
  if (newTab) {
    safeOpenWindow(url, "_blank", "noopener,noreferrer");
  } else {
    safeNavigate(url);
  }
};

// Calendar booking system
const openCalendlyBooking = () => {
  // Integration with Calendly or similar booking system
  const calendlyUrl = "https://calendly.com/etsec-security/consultation";
  openExternalLink(calendlyUrl);
  trackEvent("booking_started", "engagement", "consultation");
};

// Contact actions
export const buttonActions = {
  // Home page actions
  bookFreeCall: (): ButtonAction => ({
    type: "navigation",
    label: "Book a Free Call",
    handler: async () => {
      trackEvent("book_call_clicked", "engagement", "hero_cta");
      showNotification("Redirecting to contact page...", "info");
      setTimeout(() => {
        safeNavigate("/contact?reason=booking");
      }, 1000);
    },
    analytics: {
      event: "book_call_clicked",
      category: "engagement",
      label: "hero_cta",
    },
  }),

  learnMore: (): ButtonAction => ({
    type: "navigation",
    label: "Learn More",
    handler: () => {
      trackEvent("learn_more_clicked", "engagement", "hero_cta");
      safeNavigate("/contact");
    },
    analytics: {
      event: "learn_more_clicked",
      category: "engagement",
      label: "hero_cta",
    },
  }),

  askQuestion: (): ButtonAction => ({
    type: "contact",
    label: "Ask A Question",
    handler: () => {
      trackEvent("ask_question_clicked", "engagement", "faq_section");
      safeNavigate("/contact?reason=question");
    },
    analytics: {
      event: "ask_question_clicked",
      category: "engagement",
      label: "faq_section",
    },
  }),

  // Contact page actions
  sendMessage: (): ButtonAction => ({
    type: "form-submit",
    label: "Send Message",
    handler: async () => {
      trackEvent("contact_form_submitted", "engagement", "contact_form");
      // Form validation and submission logic will be handled by the form component
      showNotification(
        "Message sent successfully! We'll respond within 2 hours.",
        "success"
      );
    },
    analytics: {
      event: "contact_form_submitted",
      category: "engagement",
      label: "contact_form",
    },
  }),

  emergencyCall: (): ButtonAction => ({
    type: "emergency",
    label: "Emergency Call",
    handler: () => {
      trackEvent("emergency_call_clicked", "urgent", "contact_methods");
      if (typeof window !== "undefined") {
        const confirmed = confirm(
          "This will initiate an emergency call to our 24/7 hotline. Continue?"
        );
        if (confirmed) {
          safeNavigate("tel:+15553873224"); // +1 (555) ETSEC-24
        }
      }
    },
    analytics: {
      event: "emergency_call_clicked",
      category: "urgent",
      label: "contact_methods",
    },
  }),

  emailSupport: (): ButtonAction => ({
    type: "contact",
    label: "Email Support",
    handler: () => {
      trackEvent("email_support_clicked", "engagement", "contact_methods");
      const subject = encodeURIComponent("Support Request - ETSEC");
      const body = encodeURIComponent(
        "Hi ETSEC Team,\n\nI need assistance with:\n\n[Please describe your issue]\n\nBest regards"
      );
  safeNavigate(`mailto:contact@etsecinc.com?subject=${subject}&body=${body}`);
    },
    analytics: {
      event: "email_support_clicked",
      category: "engagement",
      label: "contact_methods",
    },
  }),

  scheduleConsultation: (): ButtonAction => ({
    type: "navigation",
    label: "Schedule Consultation",
    handler: () => {
      trackEvent("consultation_clicked", "engagement", "contact_methods");
      safeNavigate("/contact?reason=consultation");
    },
    analytics: {
      event: "consultation_clicked",
      category: "engagement",
      label: "contact_methods",
    },
  }),

  liveChat: (): ButtonAction => ({
    type: "support",
    label: "Start Live Chat",
    handler: () => {
      trackEvent("live_chat_clicked", "engagement", "contact_methods");
      // Integrate with chat system (Intercom, Zendesk Chat, etc.)
      showNotification(
        "Live chat will be available soon. Please use email or phone for immediate assistance.",
        "info"
      );
    },
    analytics: {
      event: "live_chat_clicked",
      category: "engagement",
      label: "contact_methods",
    },
  }),

  // About page actions
  meetTeam: (): ButtonAction => ({
    type: "navigation",
    label: "Meet Our Team",
    handler: () => {
      trackEvent("meet_team_clicked", "engagement", "about_cta");
      safeNavigate("/contact?section=team");
    },
    analytics: {
      event: "meet_team_clicked",
      category: "engagement",
      label: "about_cta",
    },
  }),

  getProtected: (): ButtonAction => ({
    type: "navigation",
    label: "Get Protected Today",
    handler: () => {
      trackEvent("get_protected_clicked", "conversion", "about_cta");
      safeNavigate("/contact?reason=protection");
    },
    analytics: {
      event: "get_protected_clicked",
      category: "conversion",
      label: "about_cta",
    },
  }),

  learnMoreAbout: (): ButtonAction => ({
    type: "navigation",
    label: "Learn More",
    handler: () => {
      trackEvent("learn_more_about_clicked", "engagement", "about_cta");
      safeNavigate("/contact?reason=learn-more");
    },
    analytics: {
      event: "learn_more_about_clicked",
      category: "engagement",
      label: "about_cta",
    },
  }),

  // Updates page actions
  readFullArticle: (articleId: string): ButtonAction => ({
    type: "navigation",
    label: "Read Full Article",
    handler: () => {
      trackEvent("article_read_clicked", "engagement", `article_${articleId}`);
      // Navigate to full article page
      safeNavigate(`/updates/${articleId}`);
    },
    analytics: {
      event: "article_read_clicked",
      category: "engagement",
      label: `article_${articleId}`,
    },
  }),

  shareArticle: (articleId: string, platform?: string): ButtonAction => ({
    type: "share",
    label: "Share Article",
    handler: () => {
      trackEvent(
        "article_shared",
        "engagement",
        `${platform || "generic"}_${articleId}`
      );
      const origin = safeGetOrigin();
      const url = encodeURIComponent(`${origin}/updates/${articleId}`);
      const title = encodeURIComponent(
        "Check out this cybersecurity update from ETSEC"
      );

      if (platform === "twitter") {
        openExternalLink(
          `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        );
      } else if (platform === "linkedin") {
        openExternalLink(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        );
      } else {
        // Generic share using Web Share API if available
        if (typeof window !== "undefined" && navigator.share) {
          const origin = safeGetOrigin();
          navigator.share({
            title: "ETSEC Security Update",
            url: `${origin}/updates/${articleId}`,
          });
        } else if (typeof window !== "undefined") {
          // Fallback to copy to clipboard
          const origin = safeGetOrigin();
          navigator.clipboard.writeText(`${origin}/updates/${articleId}`);
          showNotification("Article link copied to clipboard!", "success");
        }
      }
    },
    analytics: {
      event: "article_shared",
      category: "engagement",
      label: `${platform || "generic"}_${articleId}`,
    },
  }),

  downloadReport: (reportId: string): ButtonAction => ({
    type: "download",
    label: "Download Report",
    handler: () => {
      trackEvent("report_downloaded", "conversion", `report_${reportId}`);
      // Simulate download - replace with actual download logic
      showNotification("Report download started...", "success");
      // Example: safeNavigate(`/downloads/reports/${reportId}.pdf`);
    },
    analytics: {
      event: "report_downloaded",
      category: "conversion",
      label: `report_${reportId}`,
    },
  }),

  subscribeUpdates: (): ButtonAction => ({
    type: "subscribe",
    label: "Subscribe to Updates",
    handler: () => {
      trackEvent("newsletter_subscribe_clicked", "engagement", "updates_page");
      // Navigate to subscription form or show modal
      safeNavigate("/contact?reason=subscribe");
    },
    analytics: {
      event: "newsletter_subscribe_clicked",
      category: "engagement",
      label: "updates_page",
    },
  }),

  filterUpdates: (category: string): ButtonAction => ({
    type: "filter",
    label: `Filter: ${category}`,
    handler: () => {
      trackEvent("updates_filtered", "engagement", `category_${category}`);
      // Update URL with filter parameter
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("category", category);
        safeHistoryPushState({}, "", url.toString());
        // Trigger re-render of updates list
        safeDispatchEvent(
          new CustomEvent("filterUpdates", { detail: { category } })
        );
      }
    },
    analytics: {
      event: "updates_filtered",
      category: "engagement",
      label: `category_${category}`,
    },
  }),

  // Generic utility actions
  scrollToTop: (): ButtonAction => ({
    type: "scroll",
    label: "Back to Top",
    handler: () => {
      safeScrollTo({ top: 0, behavior: "smooth" });
      trackEvent("scroll_to_top", "navigation", "utility");
    },
    analytics: {
      event: "scroll_to_top",
      category: "navigation",
      label: "utility",
    },
  }),

  openModal: (modalId: string): ButtonAction => ({
    type: "modal",
    label: "Open Modal",
    handler: () => {
      trackEvent("modal_opened", "interaction", modalId);
      // Dispatch custom event to open modal
      safeDispatchEvent(
        new CustomEvent("openModal", { detail: { modalId } })
      );
    },
    analytics: {
      event: "modal_opened",
      category: "interaction",
      label: modalId,
    },
  }),

  // Navigation actions
  navigateToPage: (page: string): ButtonAction => ({
    type: "navigation",
    label: `Go to ${page}`,
    handler: () => {
      trackEvent("navigation_clicked", "navigation", page);
      safeNavigate(`/${page}`);
    },
    analytics: {
      event: "navigation_clicked",
      category: "navigation",
      label: page,
    },
  }),
};

// Helper function to execute button action
export const executeButtonAction = (action: ButtonAction) => {
  if (action.analytics) {
    trackEvent(
      action.analytics.event,
      action.analytics.category,
      action.analytics.label
    );
  }
  action.handler();
};

// Hook for button actions
export const useButtonAction = (
  actionType: keyof typeof buttonActions,
  ...args: any[]
) => {
  return () => {
    const action = (buttonActions as any)[actionType](...args);
    executeButtonAction(action);
  };
};
