import { useState } from "react";
import { Mail, Phone, User } from "lucide-react";
import toast from "../../utils/toast";

const tabs = [
  { key: "profile", label: "Profile Details" },
  { key: "security", label: "Security & Access" },
  { key: "payments", label: "Payment Methods" },
  { key: "notifications", label: "Notifications" },
];

const Setting = () => {
  const [active, setActive] = useState("profile");
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
            Settings & Account Control
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
              {active === "profile" && (
                <section>
                  <div className="rounded-2xl p-0 sm:p-6">
                    <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start">
                        <div className="w-full max-w-sm lg:max-w-none rounded-xl p-4 mb-4">
                          <h3 className="text-sm font-bold text-white mb-4 text-center min-[380px]:text-left">
                            Dealer Profile Image
                          </h3>
                          <div className="flex flex-col min-[380px]:flex-row items-center min-[380px]:items-start gap-4">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-neutral-900 flex shrink-0 items-center justify-center ring-2 ring-red-600">
                              <img
                                src="/src/assets/images/welcomImg.png"
                                alt="profile"
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="w-full min-[380px]:flex-1 text-center min-[380px]:text-left">
                              <p className="text-sm leading-6 text-neutral-400">
                                Upload a clear professional image of yourself or your
                                company logo. Supports PNG, JPG (Min 400×400px).
                              </p>

                              <div className="mt-3">
                                <button className="inline-block w-full min-[380px]:w-auto bg-neutral-900 border border-neutral-700 text-white px-4 py-2 rounded text-sm font-bold">
                                  REPLACE IMAGE
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 mt-5">
                      {/* Left: Image + info */}

                      {/* Right: Form fields */}
                      <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-2">
                              Full name
                            </label>
                            <div className="flex items-center bg-black/40 border border-neutral-700 rounded px-3 py-2">
                              <User
                                className="text-neutral-400 mr-3"
                                size={18}
                              />
                              <input
                                className="bg-transparent w-full text-white outline-none placeholder:text-neutral-500"
                                defaultValue="John Wickson"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-2">
                              Username
                            </label>
                            <div className="flex items-center bg-black/40 border border-neutral-700 rounded px-3 py-2">
                              <span className="text-neutral-500 mr-3">@</span>
                              <input
                                className="bg-transparent w-full text-white outline-none placeholder:text-neutral-500"
                                defaultValue="wickson_tactical"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-2">
                              Email address
                            </label>
                            <div className="flex items-center bg-black/40 border border-neutral-700 rounded px-3 py-2">
                              <Mail
                                className="text-neutral-400 mr-3"
                                size={16}
                              />
                              <input
                                className="bg-transparent w-full text-white outline-none placeholder:text-neutral-500"
                                defaultValue="john@wicksonarmory.com"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs text-neutral-400 uppercase tracking-wider mb-2">
                              Phone number
                            </label>
                            <div className="flex items-center bg-black/40 border border-neutral-700 rounded px-3 py-2">
                              <Phone
                                className="text-neutral-400 mr-3"
                                size={16}
                              />
                              <input
                                className="bg-transparent w-full text-white outline-none placeholder:text-neutral-500"
                                defaultValue="+1 (555) 902-1144"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            onClick={handleSaveChanges}
                            className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 rounded-full font-black uppercase tracking-wider text-white shadow-[0_8px_30px_rgba(232,12,12,0.35)]"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {active === "security" && (
                <section>
                  <h2 className="text-lg font-bold mb-3">Security & Access</h2>
                  <p className="text-sm text-neutral-400 mb-6">
                    Manage authentication methods and monitor account access
                    logs.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-neutral-400">
                        Current password
                      </label>
                      <input
                        type="password"
                        className="w-full bg-black/40 border border-neutral-700 rounded px-3 py-2 text-white"
                        defaultValue="••••••••"
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-neutral-400">
                          New password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-black/40 border border-neutral-700 rounded px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-neutral-400">
                          Confirm password
                        </label>
                        <input
                          type="password"
                          className="w-full bg-black/40 border border-neutral-700 rounded px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-black/30 rounded border border-neutral-800 text-sm text-neutral-400">
                      <p className="font-bold mb-2">Password requirements</p>
                      <ul className="text-xs space-y-1">
                        <li>• Min. 8 characters</li>
                        <li>• One uppercase letter</li>
                        <li>• One special character</li>
                      </ul>
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

              {active === "payments" && (
                <section>
                  <h2 className="text-lg font-bold mb-3">Payment Methods</h2>
                  <p className="text-sm text-neutral-400 mb-6">
                    Manage credit cards and corporate bank accounts for stock
                    replenishment.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-r from-neutral-800 to-neutral-700 rounded-lg border border-neutral-700">
                        <p className="text-xs text-neutral-400">
                          Default Method
                        </p>
                        <div className="mt-3 text-white font-black text-xl">
                          **** 4582
                        </div>
                        <div className="mt-2 text-sm text-neutral-400">
                          Expires 08/28
                        </div>
                      </div>

                      <div className="p-4 bg-neutral-800 rounded-lg border border-neutral-700">
                        <p className="text-xs text-neutral-400">Secondary</p>
                        <div className="mt-3 text-white font-black text-xl">
                          **** 9921
                        </div>
                        <div className="mt-2 text-sm text-neutral-400">
                          Expires 12/26
                        </div>
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

              {active === "notifications" && (
                <section>
                  <h2 className="text-lg font-bold mb-3">
                    Notification Settings
                  </h2>
                  <p className="text-sm text-neutral-400 mb-6">
                    Control the flow of information across your tactical
                    network.
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
