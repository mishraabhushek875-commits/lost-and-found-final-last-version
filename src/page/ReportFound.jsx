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
  <div className="flex flex-col gap-1.5">
    <label className="text-xs sm:text-sm font-medium text-slate-600">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    <div className="w-full">{children}</div>
  </div>
);

const inputCls =
  "w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all";

const inputWithIconCls =
  "w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all";

const IconSlot = ({ children }) => (
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
    {children}
  </span>
);

const SectionHead = ({ num, title }) => (
  <div className="px-4 sm:px-6 py-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-semibold flex-shrink-0">
      {num}
    </span>
    <h2 className="text-xs font-semibold text-slate-600 uppercase">{title}</h2>
  </div>
);

const ReportFound = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createSuccess, createLoading, error } = useSelector((s) => s.items);

  const fileInputRef   = useRef(null);
  const cameraInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title:        "",
    description:  "",
    category:     "",
    imagePreview: "",
    file:         null,
    reporterName: "",
    UserId:       "",
    phoneNo:      "",
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

  const removeImage = () => {
    setFormData((p) => ({ ...p, imagePreview: "", file: null }));
    if (fileInputRef.current)   fileInputRef.current.value   = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim())        { toast.error("Title likhein");          return; }
    if (!formData.description.trim())  { toast.error("Description likhein");    return; }
    if (!formData.category)            { toast.error("Category select karein"); return; }
    if (!formData.reporterName.trim()) { toast.error("Naam likhein");           return; }
    if (!formData.UserId.trim())       { toast.error("ID likhein");             return; }
    if (!formData.phoneNo.trim())      { toast.error("Contact number likhein"); return; }

    const fd = new FormData();
    fd.append("title",        formData.title);
    fd.append("description",  formData.description);
    fd.append("category",     formData.category);
    fd.append("status",       "found");
    fd.append("reporterName", formData.reporterName);
    fd.append("UserId",       formData.UserId);
    fd.append("phoneNo",      formData.phoneNo);
    if (formData.file) fd.append("image", formData.file);

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
    }
  }, [createSuccess, error]);

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-3 sm:px-6 py-8">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-6 flex gap-3 items-center">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
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
                  className={`${inputCls} resize-none`}
                  placeholder="Item ki description likhein..."
                />
              </Field>

              <Field label="Category" required>
                <div className="grid grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => set("category", cat.value)}
                      className={`flex flex-col items-center justify-center gap-1 p-2 sm:p-3 rounded-xl border text-xs font-medium transition-all min-w-0 overflow-hidden
                        ${formData.category === cat.value
                          ? "bg-blue-600 text-white border-blue-600 shadow-md"
                          : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                        }`}
                    >
                      <span className="text-base sm:text-lg leading-none flex-shrink-0">{cat.icon}</span>
                      <span className="w-full text-center leading-tight overflow-hidden text-ellipsis whitespace-nowrap">
                        {cat.label}
                      </span>
                    </button>
                  ))}
                </div>
              </Field>

              {/* Photo Upload — Gallery + Camera */}
              <Field label="Photo">

                {/* Gallery input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImage(e.target.files[0])}
                />

                {/* Camera input — mobile pe seedha camera kholta hai */}
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleImage(e.target.files[0])}
                />

                {!formData.imagePreview ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    className={`flex flex-col items-center justify-center gap-3 w-full
                      rounded-xl border-2 border-dashed py-8 px-4 transition-all select-none
                      ${dragOver
                        ? "border-blue-400 bg-blue-50"
                        : "border-slate-200 bg-slate-50"
                      }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>

                    <p className="text-sm font-medium text-slate-700">Photo add karein</p>
                    <p className="text-xs text-slate-400 text-center">JPG, PNG, WEBP · max 5 MB</p>

                    {/* Do buttons — Gallery aur Camera */}
                    <div className="flex gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        Gallery
                      </button>

                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs bg-blue-600 border border-blue-600 rounded-lg text-white hover:bg-blue-700 transition-all"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        Camera
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={formData.imagePreview} alt="preview" className="w-full max-h-56 object-contain" />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button type="button" onClick={() => fileInputRef.current?.click()}
                        className="px-2.5 py-1 text-xs bg-white/90 border border-slate-200 rounded-lg text-slate-600 hover:border-blue-400 hover:text-blue-600 shadow-sm">
                        Gallery
                      </button>
                      <button type="button" onClick={() => cameraInputRef.current?.click()}
                        className="px-2.5 py-1 text-xs bg-white/90 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 shadow-sm">
                        Camera
                      </button>
                      <button type="button" onClick={removeImage}
                        className="px-2.5 py-1 text-xs bg-white/90 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 shadow-sm">
                        Remove
                      </button>
                    </div>
                    <div className="px-3 py-1.5 border-t border-slate-100 bg-white">
                      <p className="text-xs text-slate-500 truncate">{formData.file?.name}</p>
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
                    className={inputWithIconCls}
                    placeholder="Your full name"
                  />
                </div>
              </Field>

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
                    className={inputWithIconCls}
                    placeholder="Student / Employee ID"
                  />
                </div>
              </Field>

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
                    className={inputWithIconCls}
                    placeholder="Phone Number"
                    type="tel"
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
              className="w-full sm:flex-1 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl transition-all text-sm font-semibold shadow-md flex items-center justify-center gap-2"
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

export default ReportFound;