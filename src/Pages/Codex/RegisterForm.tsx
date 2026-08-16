import { Link } from 'react-router-dom';

// Phase 1 placeholder: the real form (submits a finalized /design canvas
// state to the registry backend) lands once the builder produces real state
// to submit — see the roadmap in the project plan.
const RegisterForm = () => {
  return (
    <div className="min-h-screen bg-black px-6 py-16 sm:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-copperplate text-3xl text-[#D4FFFD] sm:text-4xl">
          ✠ Register a Servo-Skull ✠
        </h1>
        <div className="mt-10 rounded-lg border border-dashed border-[#2a4a48] bg-[#0a1615] p-8 text-center">
          <p className="text-[#D4FFFD]">Coming soon.</p>
          <p className="mt-2 text-sm text-[#9fd8d4]">
            This form will take a finalized build from the{' '}
            <Link to="/design" className="text-[#72eaf6] underline underline-offset-4">
              Design Servitor Skull
            </Link>{' '}
            builder and add it to the Codex.
          </p>
        </div>

        <Link
          to="/codex"
          className="mt-12 inline-block text-sm text-[#72eaf6] underline underline-offset-4 hover:text-[#D4FFFD]"
        >
          &larr; Back to Codex
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
