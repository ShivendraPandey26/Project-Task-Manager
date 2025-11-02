import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="text-center px-6 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
          Taskly – Simplify Your Work. Achieve More.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Stay organized, track your progress, and meet your goals effortlessly.
          Whether you’re working solo or managing a team, Taskly helps you stay
          productive with ease.
        </p>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Why Choose TaskFlow
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Easy Task Management",
                desc: "Create, edit, and organize your tasks with just a few clicks.",
              },
              {
                title: "Smart Reminders",
                desc: "Never miss a deadline with built-in alerts and notifications.",
              },
              {
                title: "Progress Tracking",
                desc: "Visualize your productivity with detailed analytics and reports.",
              },
              {
                title: "Team Collaboration",
                desc: "Assign tasks, set priorities, and work together seamlessly.",
              },
              {
                title: "Cloud Sync",
                desc: "Access your tasks anytime, anywhere, on any device.",
              },
              {
                title: "Secure Platform",
                desc: "Your data is safe with modern encryption and privacy standards.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-600">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-16 px-6 text-center transition-colors duration-500">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 ">
            Designed for Everyone
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you’re a student, a freelancer, or a project manager —
            Taskly adapts to your workflow. Manage personal goals, plan
            projects, and lead teams efficiently from one intuitive dashboard.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center transition-colors duration-500 border-y-2">
        <p>© 2025 Taskly. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2 text-sm">
          <a href="#" className="hover:text-muted-foreground">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" className="hover:text-muted-foreground">
            Terms of Use
          </a>
        </div>
      </footer>
    </div>
  );
};

export default page;
