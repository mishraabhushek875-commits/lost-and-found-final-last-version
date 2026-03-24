import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createItem, resetItemState } from "../Redux/store/itemsSlice";
import { toast } from "sonner";

const CATEGORIES = [
  { value: "electronics", icon: "⚡", label: "Electronics" },
  { value: "documents",   icon: "📄", label: "Documents"   },
  { value: "clothing",    icon: "👕", label: "Clothing"    },
  { value: "jewelry",     icon: "💍", label: "Jewelry"     },
  { value: "keys",        icon: "🔑", label: "Keys"        },
  { value: "wallet",      icon: "👛", label: "Wallet"      },
  { value: "bag",         icon: "🎒", label: "Bag"         },
  { value: "other",       icon: "📦", label: "Other"       },
];

const Field = ({ label, required, children }) => (
  <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-4">
    <label className="sm:w-36 sm:text-right text-xs sm:text-sm font-medium text-slate-600 sm:pt-2">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    <div className="flex-1 w-full">{children}</div>
  </div>
);

const inputCls =
  "w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base rounded-lg sm:rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all";

const IconSlot = ({ children }) => (
  <span className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-slate-400">
    {children}
  </span>
);

const SectionHead = ({ num, title, note }) => (
  <div className="px-4 sm:px-6 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-500 text-xs flex items-center justify-center font-semibold">
      {num}
    </span>
    <h2 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{title}</h2>
    {note && <span className="text-xs text-slate-400 font-normal normal-case tracking-normal">{note}</span>}
  </div>
);

const ReportLost = () => {
  const navigate     = useNavigate();
  const dispatch     = useDispatch();
  const { createSuccess, createLoading, error } = useSelector((s) => s.items);
  const fileInputRef = useRef(null);

  // ✅ Backend ke exact field names use kar rahe hain
  const [formData, setFormData] = useState({
    title:        "",   // ✅ backend: title
    location:     "",
    description:  "",
    date:         "",
    category:     "other",
    imagePreview: "",
    file:         null,
    reporterName: "",   // ✅ backend: reporterName
    UserId:       "",   // ✅ backend: UserId
    phoneNo:      "",   // ✅ backend: phoneNo
  });

  const [dragOver, setDragOver] = useState(false);

  const set = (key, val) => setFormData((p) => ({ ...p, [key]: val }));
  const handleChange = (e) => set(e.target.name, e.target.value);

  const handleImage = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Sirf image files allowed hain (JPG, PNG, etc.)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size 10MB se kam honi chahiye");
      return;
    }
    setFormData((p) => ({
      ...p,
      imagePreview: URL.createObjectURL(file),
      file,
    }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleImage(e.dataTransfer.files[0]);
  };

  const removeImage = () => {
    setFormData((p) => ({ ...p, imagePreview: "", file: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ✅ FIXED handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation pehle
    if (!formData.title.trim())        { toast.error("Item name likhein");      return; }
    if (!formData.description.trim())  { toast.error("Description likhein");    return; }
    if (!formData.category)            { toast.error("Category select karein"); return; }
    if (!formData.location.trim())     { toast.error("Location likhein");       return; }
    if (!formData.date)                { toast.error("Date select karein");      return; }
    if (!formData.reporterName.trim()) { toast.error("Naam likhein");           return; }
    if (!formData.UserId.trim())       { toast.error("ID likhein");             return; }
    if (!formData.phoneNo.trim())      { toast.error("Contact number likhein"); return; }

    // ✅ Backend ke exact field names se FormData banao
    const fd = new FormData();
    fd.append("title",        formData.title);
    fd.append("description",  formData.description);
    fd.append("category",     formData.category);
    fd.append("location",     formData.location);
    fd.append("date",         formData.date);
    fd.append("status",       "lost");              // ✅ status = lost
    fd.append("reporterName", formData.reporterName);
    fd.append("UserId",       formData.UserId);
    fd.append("phoneNo",      formData.phoneNo);
    if (formData.file) fd.append("image", formData.file);

    // Debug log
    for (let [key, value] of fd.entries()) {
      console.log(key, "→", value);
    }

    // ✅ Sirf ek baar dispatch
    dispatch(createItem(fd));
  };

  useEffect(() => {
    if (createSuccess) {
      toast.success("Lost item reported successfully!");
      dispatch(resetItemState());
      navigate("/lost-item");
    }
    if (error) {
      toast.error(error);
      dispatch(resetItemState());
    }
  }, [createSuccess, error]);

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-3 sm:px-6 py-8">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-6 flex gap-3 items-center">
          <div className="w-9 h-9 bg-rose-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-800">Report Lost Item</h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Fill in the details below to report an item you lost on campus.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

          {/* Section 1 — Item Details */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <SectionHead num="1" title="Item Details" />
            <div className="px-4 sm:px-6 py-4 space-y-4">

              {/* ✅ name="title" — backend match */}
              <Field label="Item Name" required>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Blue backpack"
                  className={inputCls}
                />
              </Field>

              <Field label="Description" required>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the item — color, brand, markings, anything distinctive..."
                  className={`${inputCls} resize-none`}
                />
              </Field>

              <Field label="Category" required>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => set("category", cat.value)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border text-xs font-medium transition-all
                        ${formData.category === cat.value
                          ? "border-rose-400 bg-rose-50 text-rose-600"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                    >
                      <span className="text-base leading-none">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Lost Location" required>
                <div className="relative">
                  <IconSlot>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </IconSlot>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Library, Block C"
                    className={`${inputCls} pl-9 sm:pl-10`}
                  />
                </div>
              </Field>

              <Field label="Lost Date" required>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  className={inputCls}
                />
              </Field>

              {/* Photo Upload */}
              <Field label="Photo">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImage(e.target.files[0])}
                />
                {!formData.imagePreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    className={`flex flex-col items-center justify-center gap-2 w-full
                      rounded-xl border-2 border-dashed cursor-pointer py-8 px-4
                      transition-all select-none
                      ${dragOver
                        ? "border-rose-400 bg-rose-50"
                        : "border-slate-200 bg-slate-50 hover:border-rose-300 hover:bg-rose-50/50"
                      }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-xl">📷</div>
                    <p className="text-sm font-medium text-slate-700">
                      {dragOver ? "Yahan drop karein" : "Photo upload karein"}
                    </p>
                    <p className="text-xs text-slate-400 text-center">
                      Click karein ya drag &amp; drop · PNG, JPG · max 10 MB
                    </p>
                    <button type="button"
                      className="mt-1 px-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-rose-400 hover:text-rose-500 transition-all">
                      File choose karein
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={formData.imagePreview} alt="Item preview" className="w-full max-h-56 object-contain" />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button type="button" onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1 text-xs bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg text-slate-600 hover:border-rose-400 hover:text-rose-500 shadow-sm">
                        ✏️ Change
                      </button>
                      <button type="button" onClick={removeImage}
                        className="px-2.5 py-1 text-xs bg-white/90 backdrop-blur-sm border border-red-200 rounded-lg text-red-500 hover:bg-red-50 shadow-sm">
                        🗑 Remove
                      </button>
                    </div>
                    <div className="px-3 py-1.5 border-t border-slate-100 bg-white">
                      <p className="text-xs text-slate-500 truncate">📎 {formData.file?.name}</p>
                    </div>
                  </div>
                )}
              </Field>

            </div>
          </div>

          {/* Section 2 — Reporter Info */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <SectionHead num="2" title="Reporter Information" />
            <div className="px-4 sm:px-6 py-4 space-y-4">

              {/* ✅ name="reporterName" — backend match */}
              <Field label="Student Name" required>
                <div className="relative">
                  <IconSlot>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </IconSlot>
                  <input
                    name="reporterName"
                    value={formData.reporterName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`${inputCls} pl-9 sm:pl-10`}
                  />
                </div>
              </Field>

              {/* ✅ name="UserId" — backend match */}
              <Field label="ID" required>
                <div className="relative">
                  <IconSlot>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                    </svg>
                  </IconSlot>
                  <input
                    name="UserId"
                    value={formData.UserId}
                    onChange={handleChange}
                    placeholder="Student /Employee Id"
                    className={`${inputCls} pl-9 sm:pl-10`}
                  />
                </div>
              </Field>

              {/* ✅ name="phoneNo" — backend match */}
              <Field label="Contact" required>
                <div className="relative">
                  <IconSlot>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </IconSlot>
                  <input
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    type="tel"
                    className={`${inputCls} pl-9 sm:pl-10`}
                  />
                </div>
              </Field>

            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pb-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createLoading}
              className="w-full sm:flex-1 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 disabled:bg-rose-400 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
            >
              {createLoading ? "Submitting..." : (
                <>
                  Submit Report
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ReportLost;