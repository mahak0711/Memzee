"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Capture",
    description:
      "Drop thoughts naturally. No folders, tags, or manual organization required.",
  },
  {
    number: "02",
    title: "Connect",
    description:
      "Memzee automatically links people, projects, meetings, and ideas into a living knowledge graph.",
  },
  {
    number: "03",
    title: "Recall",
    description:
      "Ask questions naturally and retrieve exactly what you meant instead of searching with keywords.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-40">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: .6 }}
        className="text-center"
      >
        <p className="font-mono text-cyan-400 tracking-[0.3em] uppercase">
          Workflow
        </p>

        <h2 className="mt-6 font-display text-5xl font-bold">
          Build your second brain
          <br />
          one memory at a time.
        </h2>
      </motion.div>

      <div className="mt-28 grid gap-12 md:grid-cols-3">

        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.15,
              duration: .5,
            }}
            className="glass rounded-3xl p-8"
          >
            <p className="font-mono text-cyan-400">
              {step.number}
            </p>

            <h3 className="mt-5 font-display text-3xl font-bold">
              {step.title}
            </h3>

            <p className="mt-5 leading-8 text-zinc-400">
              {step.description}
            </p>
          </motion.div>
        ))}

      </div>

    </section>
  );
}