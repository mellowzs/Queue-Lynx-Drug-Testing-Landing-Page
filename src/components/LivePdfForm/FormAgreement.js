export default function FormAgreement({ agreed, setAgreed }) {
  return (
    <div className="flex items-start space-x-2 mt-4 bg-black/5 py-8 sm:py-5 rounded-lg">
      <input
        type="checkbox"
        id="agreement"
        name="agreement"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
        className="ml-3 size-6 rounded-lg"
      />
      <label
        htmlFor="agreement"
        className="sm:text-xs text-base text-black text-justify block mx-4"
      >
        I have read the{" "}
        <a
          href="/TOS.pdf"
          target="_blank"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Terms and Agreement
        </a>{" "}
        and agree that my personal information will be collected and used solely
        for processing this drug test.
      </label>
    </div>
  );
}
