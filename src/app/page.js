import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      {/* LEFT: TEXT */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold leading-tight">
          Ovarian Cancer <br />
          Risk Prediction
        </h1>

        <p className="text-gray-600 max-w-xl">
          This web-based application demonstrates a machine learning model
          designed to estimate the risk of ovarian malignancy using
          preoperative clinical features.
        </p>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-black text-white px-20 py-5 rounded-md"
          >
            Login to Predict
          </Link>

        </div>

        <p className="text-sm text-gray-500 pt-4">
          ⚠️ This tool is for research and educational purposes only.
          It is not intended for clinical decision-making.
        </p>
      </div>

      {/* RIGHT: IMAGE */}
      <div className="flex justify-center">
        <Image
          src="/picture/doctor.png"
          alt="Clinical decision support"
          width={480}
          height={360}
          className="rounded-xl shadow-md"
          priority
        />
      </div>
    </section>
  );
}
