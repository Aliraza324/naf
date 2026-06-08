import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  User,
  Loader2,
  MapPin,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import toast from "../../utils/toast";
import useDealerProfile from "../../hooks/dealer/useDealerProfile";
import { useDealerPasswordSetting } from "../../hooks/dealer/Setting";

const tabs = [
  { key: "profile", label: "Profile Details" },
  { key: "security", label: "Security & Access" },
  { key: "payments", label: "Payment Methods" },
  { key: "notifications", label: "Notifications" },
];

const Setting = () => {
  const [active, setActive] = useState("profile");
  const { profile, loading, saving, updateProfile } = useDealerProfile();
  const [visiblePasswords, setVisiblePasswords] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordResponse, setPasswordResponse] = useState(null);
  const { savingPassword, updateDealerPassword } = useDealerPasswordSetting();

  // ─── Profile form state ────────────────────────────────────────────────────
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    address: "",
    profileImage: "",
  });

  // Populate form once profile is loaded from API
  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || profile.dealerName || "",
        username: profile.username || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || profile.phone || "",
        birthDate: profile.birthDate || "",
        address: profile.address || profile.location || "",
        profileImage: profile.profileImage || "",
      });
    }
  }, [profile]);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    await updateProfile(form);
  };

  // ─── Notifications state ───────────────────────────────────────────────────
  const notificationList = [
    "Email Notifications",
    "Order Updates",
    "Promotions & Offers",
    "Payment Alerts",
    "Security Alerts",
  ];

  const [notificationSettings, setNotificationSettings] = useState({
    "Email Notifications": true,
    "Order Updates": true,
    "Promotions & Offers": false,
    "Payment Alerts": true,
    "Security Alerts": true,
  });

  const toggleNotification = (key) =>
    setNotificationSettings((s) => ({ ...s, [key]: !s[key] }));

  const togglePasswordVisibility = (field) => {
    setVisiblePasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const passwordChecks = {
    minLength: passwordForm.newPassword.length >= 8,
    uppercase: /[A-Z]/.test(passwordForm.newPassword),
    specialChar: /[^A-Za-z0-9]/.test(passwordForm.newPassword),
  };

  const passwordRequirements = [
    { key: "minLength", label: "Min. 8 Characters" },
    { key: "uppercase", label: "One Uppercase Letter" },
    { key: "specialChar", label: "One Special Char" },
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordResponse(null);
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSavePassword = async (event) => {
    event?.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      const message = "Current password, new password, and confirm password are required";
      setPasswordResponse({ success: false, message });
      toast.error(message);
      return;
    }

    if (newPassword !== confirmPassword) {
      const message = "New password and confirm password do not match";
      setPasswordResponse({ success: false, message });
      toast.error(message);
      return;
    }

    const failedRequirements = passwordRequirements
      .filter((requirement) => !passwordChecks[requirement.key])
      .map((requirement) => requirement.label);

    if (failedRequirements.length > 0) {
      const message = `Password requirements are not met: ${failedRequirements.join(", ")}`;
      setPasswordResponse({
        success: false,
        message,
        failedRequirements,
        checks: passwordChecks,
      });
      toast.error(message);
      return;
    }

    const result = await updateDealerPassword(passwordForm);
    setPasswordResponse({
      success: result.success,
      message: result.success ? result.message : result.error,
      failedRequirements: result.failedRequirements || [],
      checks: result.checks,
    });

    if (result.success) {
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handleSaveChanges = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="min-h-screen bg-black px-3 py-6 sm:px-8 sm:py-8 lg:px-12 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <p className="text-xs text-red-500 font-bold tracking-widest uppercase">
            Dealer Account Control
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-black uppercase">
            Settings &amp; Account Control
          </h1>
          <p className="mt-2 text-sm text-neutral-400 max-w-2xl">
            Manage your dealer profile, business details, security preferences,
            payment methods, and platform settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={`flex w-full items-center gap-3 px-3 py-3 text-sm font-semibold rounded-md transition-colors mb-2 ${
                    active === tab.key
                      ? "bg-gradient-to-r from-[#1f1a1a] to-[#161616] ring-1 ring-red-600 text-white"
                      : "text-neutral-300 hover:bg-white/3"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-red-600/80" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="hidden lg:block bg-neutral-900 border border-neutral-800 rounded-xl p-4">
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-medium mb-2">
                Active Credit
              </p>
              <div className="text-2xl font-black text-white">$125,000.00</div>
              <p className="text-xs text-neutral-500 mt-1">
                Used: $8,250 • 65% capacity
              </p>
            </div>
          </aside>

          {/* Main content */}
          <main>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 sm:p-6">

              {/* ── Profile Tab ───────────────────────────────────────────── */}
              {active === "profile" && (
                <section>
                  {loading ? (
                    <div className="flex items-center justify-center py-16 gap-3 text-neutral-400">
                      <Loader2 className="animate-spin" size={22} />
                      <span className="text-sm">Loading profile...</span>
                    </div>
                  ) : (
                    <div className="rounded-2xl p-0 sm:p-6">
                      {/* Profile image */}
                      <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start">
                        <div className="w-full max-w-sm lg:max-w-none rounded-xl p-4 mb-4">
                          <h3 className="text-sm font-bold text-white mb-4 text-center min-[380px]:text-left">
                            Dealer Profile Image
                          </h3>
                          <div className="flex flex-col min-[380px]:flex-row items-center min-[380px]:items-start gap-4">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-neutral-900 flex shrink-0 items-center justify-center ring-2 ring-red-600">
                              <img
                                src={form.profileImage || "/src/assets/images/welcomImg.png"}
                                alt="profile"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "/src/assets/images/welcomImg.png";
                                }}
                              />
                            </div>

                            <div className="w-full min-[380px]:flex-1 text-center min-[380px]:text-left">
                              <p className="text-sm leading-6 text-neutral-400">
                                Upload a clear professional image of yourself or your
                                company logo. Supports PNG, JPG (Min 400×400px).
                              </p>
                              <div className="mt-3">
                                <input
                                  type="file"
                                  id="profileImageInput"
                                  accept="image/png, image/jpeg"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        handleFormChange("profileImage", reader.result);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                                <label
                                  htmlFor="profileImageInput"
                                  className="inline-block w-full min-[380px]:w-auto bg-neutral-900 border border-neutral-700 text-white px-4 py-2 rounded text-sm font-bold hover:border-neutral-500 transition-colors cursor-pointer"
                                >
                                  REPLACE IMAGE
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Form fields */}
                      <div className="flex flex-col lg:flex-row gap-6 mt-5">
                        <div className="flex-1">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div>
                              <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-2">
                                Full Name
                              </label>
                              <div className="flex items-center bg-black/40 border border-neutral-700 rounded px-3 py-2 focus-within:border-red-600 transition-colors">
                                <User className="text-neutral-400 mr-3 shrink-0" size={18} />
                                <input
                                  className="bg-transparent w-full text-white outline-none placeholder:text-neutral-500"
                                  value={form.fullName}
                                  onChange={(e) => handleFormChange("fullName", e.target.value)}
                                  placeholder="Full Name"
                                />
                              </div>
                            </div>

                            

                            {/* Email */}
                            <div>
                              <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-2">
                                Email Address
                              </label>
                              <div className="flex items-center bg-black/40 border border-neutral-700 rounded px-3 py-2 focus-within:border-red-600 transition-colors">
                                <Mail className="text-neutral-400 mr-3 shrink-0" size={16} />
                                <input
                                  type="email"
                                  className="bg-transparent w-full text-white outline-none placeholder:text-neutral-500"
                                  value={form.email}
                                  onChange={(e) => handleFormChange("email", e.target.value)}
                                  placeholder="email@example.com"
                                />
                              </div>
                            </div>

                            {/* Phone */}
                            <div>
                              <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-2">
                                Phone Number
                              </label>
                              <div className="flex items-center bg-black/40 border border-neutral-700 rounded px-3 py-2 focus-within:border-red-600 transition-colors">
                                <Phone className="text-neutral-400 mr-3 shrink-0" size={16} />
                                <input
                                  className="bg-transparent w-full text-white outline-none placeholder:text-neutral-500"
                                  value={form.phoneNumber}
                                  onChange={(e) => handleFormChange("phoneNumber", e.target.value)}
                                  placeholder="+1 (555) 000-0000"
                                />
                              </div>
                            </div>

                            

                            {/* Address */}
                            <div>
                              <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-2">
                                Address / Location
                              </label>
                              <div className="flex items-center bg-black/40 border border-neutral-700 rounded px-3 py-2 focus-within:border-red-600 transition-colors">
                                <MapPin className="text-neutral-400 mr-3 shrink-0" size={16} />
                                <input
                                  className="bg-transparent w-full text-white outline-none placeholder:text-neutral-500"
                                  value={form.address}
                                  onChange={(e) => handleFormChange("address", e.target.value)}
                                  placeholder="City, Country"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 flex justify-end">
                            <button
                              type="button"
                              onClick={handleSaveProfile}
                              disabled={saving}
                              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 rounded-full font-black uppercase tracking-wider text-white shadow-[0_8px_30px_rgba(232,12,12,0.35)] disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                            >
                              {saving && <Loader2 className="animate-spin" size={16} />}
                              {saving ? "Saving..." : "Save Changes"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* ── Security Tab ──────────────────────────────────────────── */}
              {active === "security" && (
                <section className="px-1 sm:px-4">
                  <h2 className="font-display text-xl sm:text-2xl font-black uppercase italic tracking-wide text-white">
                    Security &amp; Access
                  </h2>
                  <p className="mt-2 text-sm text-neutral-400">
                    Manage authentication methods and monitor account access logs.
                  </p>

                  <form className="mt-6 space-y-4" onSubmit={handleSavePassword}>
                    <p className="text-xs font-black uppercase tracking-[0.34em] text-red-500">
                      Change Password
                    </p>
                    <div className="relative">
                      <label className="mb-3 block text-[11px] font-black uppercase tracking-[0.22em] text-neutral-400">
                        Current Password
                      </label>
                      <KeyRound
                        className="absolute left-4 top-[39px] text-neutral-400"
                        size={16}
                        strokeWidth={2.8}
                      />
                      <input
                        type={visiblePasswords.current ? "text" : "password"}
                        className="h-11 w-full rounded-[8px] border border-black bg-[#050505] pl-11 pr-10 text-xs font-bold tracking-[0.12em] text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-red-600"
                        value={passwordForm.currentPassword}
                        onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                        autoComplete="current-password"
                        placeholder="OldPass@123"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("current")}
                        className="absolute right-3 top-[38px] text-neutral-400 transition-colors hover:text-white"
                        aria-label={
                          visiblePasswords.current
                            ? "Hide current password"
                            : "Show current password"
                        }
                      >
                        {visiblePasswords.current ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <div className="relative">
                        <label className="mb-3 block text-[11px] font-black uppercase tracking-[0.22em] text-neutral-400">
                          New Password
                        </label>
                        <LockKeyhole
                          className="absolute left-4 top-[39px] text-neutral-400"
                          size={16}
                          strokeWidth={2.8}
                        />
                        <input
                          type={visiblePasswords.next ? "text" : "password"}
                          className="h-11 w-full rounded-[8px] border border-black bg-[#050505] pl-11 pr-10 text-xs font-bold tracking-[0.04em] text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-red-600"
                          value={passwordForm.newPassword}
                          onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                          autoComplete="new-password"
                          placeholder="NewPass@123"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("next")}
                          className="absolute right-3 top-[38px] text-neutral-400 transition-colors hover:text-white"
                          aria-label={
                            visiblePasswords.next ? "Hide new password" : "Show new password"
                          }
                        >
                          {visiblePasswords.next ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                      <div className="relative">
                        <label className="mb-3 block text-[11px] font-black uppercase tracking-[0.22em] text-neutral-400">
                          Confirm Password
                        </label>
                        <BadgeCheck
                          className="absolute left-4 top-[39px] text-neutral-400"
                          size={16}
                          strokeWidth={2.8}
                        />
                        <input
                          type={visiblePasswords.confirm ? "text" : "password"}
                          className="h-11 w-full rounded-[8px] border border-black bg-[#050505] pl-11 pr-10 text-xs font-bold tracking-[0.04em] text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-red-600"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                          autoComplete="new-password"
                          placeholder="NewPass@123"
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                          className="absolute right-3 top-[38px] text-neutral-400 transition-colors hover:text-white"
                          aria-label={
                            visiblePasswords.confirm
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                        >
                          {visiblePasswords.confirm ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-[10px] border border-neutral-800 bg-[#151515] px-5 py-5 sm:px-6">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400">
                        Password Requirements
                      </p>
                      <div className="mt-4 grid grid-cols-1 gap-3 text-xs sm:text-sm text-neutral-400 sm:grid-cols-3">
                        {passwordRequirements.map((requirement) => {
                          const checked = passwordChecks[requirement.key]

                          return (
                            <label key={requirement.key} className="flex items-center gap-3">
                              <input
                                type="radio"
                                checked={checked}
                                readOnly
                                className="size-3.5 accent-green-500"
                              />
                              <span className={checked ? "text-neutral-300" : "text-neutral-500"}>
                                {requirement.label}
                              </span>
                            </label>
                          )
                        })}
                      </div>
                      <ul className="hidden">
                        <li>• Min. 8 characters</li>
                        <li>• One uppercase letter</li>
                        <li>• One special character</li>
                      </ul>
                    </div>
                    <div className="mt-9 border-t border-neutral-800 pt-6 text-right">
                      <button
                        type="submit"
                        disabled={savingPassword}
                        className="inline-flex h-[52px] w-full items-center justify-center gap-4 rounded-[13px] bg-[#ff383d] px-7 text-xs font-black uppercase tracking-[0.22em] text-white shadow-[0_0_28px_rgba(255,56,61,0.36),0_6px_0_rgba(160,24,27,0.8)] transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      >
                        {savingPassword ? "Saving..." : "Save Changes"}
                        {savingPassword ? (
                          <Loader2 className="animate-spin" size={17} />
                        ) : (
                          <ArrowRight size={19} strokeWidth={3} />
                        )}
                      </button>
                    </div>
                    {passwordResponse?.message && (
                      <div
                        className={`rounded-[10px] border px-4 py-3 text-sm font-semibold ${
                          passwordResponse.success
                            ? "border-green-700 bg-green-950/40 text-green-300"
                            : "border-red-800 bg-red-950/40 text-red-300"
                        }`}
                      >
                        {passwordResponse.message}
                      </div>
                    )}
                  </form>

                </section>
              )}

              {/* ── Payments Tab ──────────────────────────────────────────── */}
              {active === "payments" && (
                <section>
                  <h2 className="text-lg font-bold mb-3">Payment Methods</h2>
                  <p className="text-sm text-neutral-400 mb-6">
                    Manage credit cards and corporate bank accounts for stock replenishment.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-lg border border-neutral-700">
                        <p className="text-xs text-neutral-400">Default Method</p>
                        <div className="mt-3 text-white font-black text-xl">**** 4582</div>
                        <div className="mt-2 text-sm text-neutral-400">Expires 08/28</div>
                      </div>

                      <div className="p-4 bg-neutral-800 rounded-lg border border-neutral-700">
                        <p className="text-xs text-neutral-400">Secondary</p>
                        <div className="mt-3 text-white font-black text-xl">**** 9921</div>
                        <div className="mt-2 text-sm text-neutral-400">Expires 12/26</div>
                      </div>
                    </div>

                    <div className="p-4 bg-neutral-800 rounded border border-neutral-700">
                      <p className="text-sm text-white font-bold">
                        Tactical Business Bank (Commercial Checking)
                      </p>
                      <p className="text-xs text-neutral-400 mt-1">
                        Routing: ••••••772 • Account: •••• 532
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 text-right">
                    <button
                      type="button"
                      onClick={handleSaveChanges}
                      className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 rounded-full font-black uppercase tracking-wider text-white shadow-[0_8px_30px_rgba(232,12,12,0.25)]"
                    >
                      Save Changes
                    </button>
                  </div>
                </section>
              )}

              {/* ── Notifications Tab ─────────────────────────────────────── */}
              {active === "notifications" && (
                <section>
                  <h2 className="text-lg font-bold mb-3">Notification Settings</h2>
                  <p className="text-sm text-neutral-400 mb-6">
                    Control the flow of information across your tactical network.
                  </p>

                  <div className="space-y-4">
                    {notificationList.map((n) => {
                      const on = notificationSettings[n];
                      return (
                        <div
                          key={n}
                          className="flex items-center justify-between bg-neutral-800 p-4 rounded border border-neutral-700"
                        >
                          <div>
                            <p className="font-bold">{n}</p>
                            <p className="text-xs text-neutral-400">
                              Receive updates related to {n.toLowerCase()}.
                            </p>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={() => toggleNotification(n)}
                              aria-pressed={on}
                              className={`w-12 h-7 flex items-center p-1 rounded-full transition-colors ${
                                on ? "bg-red-600" : "bg-neutral-700"
                              }`}
                            >
                              <div
                                className={`bg-white w-5 h-5 rounded-full shadow transform transition-transform ${
                                  on ? "translate-x-5" : "translate-x-0"
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 text-right">
                    <button
                      type="button"
                      onClick={handleSaveChanges}
                      className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 rounded-full font-black uppercase tracking-wider text-white shadow-[0_8px_30px_rgba(232,12,12,0.25)]"
                    >
                      Save Changes
                    </button>
                  </div>
                </section>
              )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Setting;

