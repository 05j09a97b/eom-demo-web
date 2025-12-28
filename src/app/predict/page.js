"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PredictPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [probability, setProbability] = useState(null);
  const [error, setError] = useState("");

  // 🔐 Login guard (cookie-based)
  useEffect(() => {
    if (!document.cookie.includes("auth=true")) {
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setProbability(null);

    const f = new FormData(e.currentTarget);

    // Payload must match backend schema
    const payload = {
      age: Number(f.get("age")),
      BMI: Number(f.get("BMI")),
      ca125: Number(f.get("ca125")),
      size: Number(f.get("size")),
      menopause: Number(f.get("menopause")),
      sol: Number(f.get("sol")),
      AH: Number(f.get("AH")),
      bilat: Number(f.get("bilat")),
      mul: Number(f.get("mul")),
    };

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      setProbability(data.cancer_probability);
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Unable to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const risk = (p) => {
    if (p < 0.15) return { label: "Low risk", color: "text-green-600" };
    if (p < 0.30) return { label: "Intermediate risk", color: "text-yellow-600" };
    return { label: "High risk", color: "text-red-600" };
  };

  return (
    <section className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-semibold">
        Ovarian Cancer Risk Prediction
      </h1>

      {/* ===== Prediction Form ===== */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow"
      >
        {/* Numeric inputs */}
        <input
          name="age"
          type="number"
          step="1"
          placeholder="Age"
          required
          className="border p-2 rounded"
        />

        <input
          name="BMI"
          type="number"
          step="0.01"
          placeholder="BMI"
          required
          className="border p-2 rounded"
        />

        <input
          name="ca125"
          type="number"
          step="0.01"
          placeholder="CA-125"
          required
          className="border p-2 rounded"
        />

        <input
          name="size"
          type="number"
          step="0.1"
          placeholder="Tumor size (cm)"
          required
          className="border p-2 rounded"
        />

        {/* Categorical inputs */}
        <select name="menopause" className="border p-2 rounded">
          <option value="0">Premenopause</option>
          <option value="1">Postmenopause</option>
        </select>

        <select name="sol" className="border p-2 rounded">
          <option value="0">Cystic</option>
          <option value="1">Solid</option>
        </select>

        <select name="AH" className="border p-2 rounded">
          <option value="0">No ascites</option>
          <option value="1">Ascites</option>
        </select>

        <select name="bilat" className="border p-2 rounded">
          <option value="0">Unilateral</option>
          <option value="1">Bilateral</option>
        </select>

        <select name="mul" className="border p-2 rounded">
          <option value="0">Single lesion</option>
          <option value="1">Multiple lesions</option>
        </select>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded w-full"
          >
            {loading ? "Predicting..." : "Run Prediction"}
          </button>
        </div>
      </form>

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* ===== Result: Single-row summary ===== */}
      {probability !== null && (
        <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div>
            <p className="text-sm text-gray-500">Predicted probability</p>
            <p className="text-2xl font-semibold">
              {(probability * 100).toFixed(1)}%
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Risk level</p>
            <p className={`text-xl font-semibold ${risk(probability).color}`}>
              {risk(probability).label}
            </p>
          </div>

          <div className="text-sm text-gray-500 md:text-right">
            ⚠️ For research and educational purposes only
          </div>
        </div>
      )}
    </section>
  );
}
