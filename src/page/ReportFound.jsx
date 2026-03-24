import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createItem, resetItemState } from "../Redux/store/itemsSlice";
import { toast } from "sonner";

const CATEGORIES = [
  { value: "electronics", icon: "⚡", label: "Electronics" },
  { value: "documents", icon: "📄", label: "Documents" },
  { value: "clothing", icon: "👕", label: "Clothing" },
  { value: "jewelry", icon: "💍", label: "Jewelry" },
  { value: "keys", icon: "🔑", label: "Keys" },
  { value: "wallet", icon: "👛", label: "Wallet" },
  { value: "bag", icon: "🎒", label: "Bag" },
  { value: "other", icon: "📦", label: "Other" },
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
  "w-full px-3 sm:px-4 py-2.5 text-sm sm:text-base rounded-lg sm:rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all";

const IconSlot = ({ children }) => (
  <span className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-slate-400">
    {children}
  </span>
);

const SectionHead = ({ num, title }) => (
  <div className="px-4 sm:px-6 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-semibold">
      {num}
    </span>
    <h2 className="text-xs font-semibold text-slate-600 uppercase">{title}</h2>
  </div>
);

const ReportFound = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createSuccess, createLoading, error } = useSelector((s) => s.items);
  const fileInputRef = useRef(null);

  // ✅ State mein backend ke exact field names
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imagePreview: "",
    file: null,
    reporterName: "",   // ✅ backend: reporterName
    UserId: "",         // ✅ backend: UserId
    phoneNo: "",        // ✅ backend: phoneNo
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
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size 5MB se kam honi chahiye");
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
  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const removeImage = () => {
    setFormData((p) => ({ ...p, imagePreview: "", file: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ✅ FIXED handleSubmit — no duplicate dispatch, correct field names
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation pehle
    if (!formData.title.trim()) { toast.error("Title likhein"); return; }
    if (!formData.description.trim()) { toast.error("Description likhein"); return; }
    if (!formData.category) { toast.error("Category select karein"); return; }
    if (!formData.reporterName.trim()) { toast.error("Naam likhein"); return; }
    if (!formData.UserId.trim()) { toast.error("ID likhein"); return; }
    if (!formData.phoneNo.trim()) { toast.error("Contact number likhein"); return; }

    // ✅ Backend ke exact field names
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("category", formData.category);
    fd.append("status", "found");
    fd.append("reporterName", formData.reporterName);  // ✅
    fd.append("UserId", formData.UserId);              // ✅
    fd.append("phoneNo", formData.phoneNo);            // ✅
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
      toast.success("Item reported successfully!");
      dispatch(resetItemState());
      navigate("/found-item");
    }
    if (error) {
      toast.error(error);
      dispatch(resetItemState());
      // ✅ /login redirect hataya
    }
  }, [createSuccess, error]);

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-3 sm:px-6 py-8">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-6 flex gap-3 items-center">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
            ✓
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-slate-800">Report Found Item</h1>
            <p className="text-xs sm:text-sm text-slate-500">Fill details of found item</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

          {/* Section 1 — Item Details */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <SectionHead num="1" title="Item Details" />
            <div className="px-4 sm:px-6 py-4 space-y-4">

              <Field label="Title" required>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Wallet, phone, keys..."
                />
              </Field>

              <Field label="Description" required>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Item ki description likhein..."
                />
              </Field>

              <Field label="Category" required>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => set("category", cat.value)}
                      className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                        formData.category === cat.value
                          ? "bg-blue-600 text-white border-blue-600 shadow-md"
                          : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                      }`}
                    >
                      <div className="text-lg mb-1">{cat.icon}</div>
                      <div>{cat.label}</div>
                    </button>
                  ))}
                </div>
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
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`flex flex-col items-center justify-center gap-2 w-full
                      rounded-xl border-2 border-dashed cursor-pointer py-8 px-4
                      transition-all select-none
                      ${dragOver
                        ? "border-blue-400 bg-blue-50"
                        : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50"
                      }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">📷</div>
                    <p className="text-sm font-medium text-slate-700">
                      {dragOver ? "Yahan drop karein" : "Photo upload karein"}
                    </p>
                    <p className="text-xs text-slate-400 text-center">
                      Click karein ya drag &amp; drop · JPG, PNG, WEBP · max 5 MB
                    </p>
                    <button type="button" className="mt-1 px-4 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all">
                      File choose karein
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={formData.imagePreview} alt="preview" className="w-full max-h-56 object-contain" />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button type="button" onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1 text-xs bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg text-slate-600 hover:text-blue-600 shadow-sm">
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
            <SectionHead num="2" title="Reporter Info" />
            <div className="px-4 sm:px-6 py-4 space-y-4">

              <Field label="Student Name" required>
                <div className="relative">
                  <IconSlot>👤</IconSlot>
                  {/* ✅ name="reporterName" — backend match */}
                  <input
                    name="reporterName"
                    value={formData.reporterName}
                    onChange={handleChange}
                    className={`${inputCls} pl-9 sm:pl-10`}
                    placeholder="Your full name"
                  />
                </div>
              </Field>

              <Field label="ID" required>
                <div className="relative">
                  <IconSlot>🪪</IconSlot>
                  {/* ✅ name="UserId" — backend match */}
                  <input
                    name="UserId"
                    value={formData.UserId}
                    onChange={handleChange}
                    className={`${inputCls} pl-9 sm:pl-10`}
                    placeholder="Student / Employee ID"
                  />
                </div>
              </Field>

              <Field label="Contact" required>
                <div className="relative">
                  <IconSlot>📞</IconSlot>
                  {/* ✅ name="phoneNo" — backend match */}
                  <input
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    className={`${inputCls} pl-9 sm:pl-10`}
                    placeholder="Phone Number"
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
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-100 transition-all text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createLoading}
              className="w-full sm:flex-1 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl transition-all text-sm font-semibold shadow-md"
            >
              {createLoading ? "Submitting..." : "Submit Report"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ReportFound;