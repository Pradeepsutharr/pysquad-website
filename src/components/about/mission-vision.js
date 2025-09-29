"use client";
import { useState } from "react";
import { Target, Eye, Gem } from "lucide-react";

const tabs = [
  {
    key: "mission",
    label: "Mission",
    icon: <Target className="w-6 h-6 text-teal-600" />,
    content: (
      <>
        <p className="mb-4">
          At PySquad, we started with a simple belief: Technology should make
          life easier, not harder. Our mission grows from that thought:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Keep things simple – we don’t overcomplicate. Every solution we
            build is made to be clear and easy to use.
          </li>
          <li>
            Focus on real problems – we create products that actually solve
            challenges people and businesses face every day.
          </li>
          <li>
            Help people grow – whether it’s a business looking to scale or an
            individual managing daily tasks, we want to give them tools that
            make progress possible.
          </li>
          <li>
            Balance innovation with usefulness – new tech is exciting, but we
            only use it when it truly adds value.
          </li>
          <li>
            Stay human-centered – behind every screen is a person. We design
            with empathy, keeping people at the heart of everything we do.
          </li>
          <li>
            Build trust for the long run – our mission is not just about
            delivering projects but creating lasting partnerships and real
            impact.
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "vision",
    label: "Vision",
    icon: <Eye className="w-6 h-6 text-teal-600" />,
    content: (
      <>
        <p className="mb-4">
          At PySquad, we started with a simple belief: Technology should make
          life easier, not harder. Our mission grows from that thought:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Keep things simple – we don’t overcomplicate. Every solution we
            build is made to be clear and easy to use.
          </li>
          <li>
            Focus on real problems – we create products that actually solve
            challenges people and businesses face every day.
          </li>
          <li>
            Help people grow – whether it’s a business looking to scale or an
            individual managing daily tasks, we want to give them tools that
            make progress possible.
          </li>
          <li>
            Balance innovation with usefulness – new tech is exciting, but we
            only use it when it truly adds value.
          </li>
          <li>
            Stay human-centered – behind every screen is a person. We design
            with empathy, keeping people at the heart of everything we do.
          </li>
          <li>
            Build trust for the long run – our mission is not just about
            delivering projects but creating lasting partnerships and real
            impact.
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "value",
    label: "Value",
    icon: <Gem className="w-6 h-6 text-teal-600" />,
    content: (
      <>
        <p className="mb-4">
          At PySquad, we started with a simple belief: Technology should make
          life easier, not harder. Our mission grows from that thought:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Keep things simple – we don’t overcomplicate. Every solution we
            build is made to be clear and easy to use.
          </li>
          <li>
            Focus on real problems – we create products that actually solve
            challenges people and businesses face every day.
          </li>
          <li>
            Help people grow – whether it’s a business looking to scale or an
            individual managing daily tasks, we want to give them tools that
            make progress possible.
          </li>
          <li>
            Balance innovation with usefulness – new tech is exciting, but we
            only use it when it truly adds value.
          </li>
          <li>
            Stay human-centered – behind every screen is a person. We design
            with empathy, keeping people at the heart of everything we do.
          </li>
          <li>
            Build trust for the long run – our mission is not just about
            delivering projects but creating lasting partnerships and real
            impact.
          </li>
        </ul>
      </>
    ),
  },
];

export default function OurMissionVision() {
  const [active, setActive] = useState("mission");

  return (
    <section className="container mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl text-textPrimary md:text-4xl font-bold">
          Our Mission, Vision & Values
        </h2>
        <p className="text-textSecondary mt-2">
          The Foundation Of How We Think, Build, And Grow
        </p>
      </div>

      <div className="flex flex-col md:flex-row  gap-8">
        {/* Left Tabs */}
        <div className="xl:col-2 lg:col-3 md:col-4 col-12 flex flex-col p-0 gap-4">
          {tabs.map((tab) => (
            <button
              name="tab-btn"
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex items-center gap-3 border-4 bg-white rounded-lg p-8 text-left transition
                ${
                  active === tab.key
                    ? "border-[#C6E6E4] shadow-md "
                    : "border-gray-100  hover:border-[#C6E6E4]"
                }`}
            >
              <span className="border-e border-e-gray-400 pe-3">
                {tab.icon}
              </span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="xl:col-10 lg:col-9 md:col-10 border-4 border-gray-100 rounded-xl p-8 shadow-sm bg-white">
          {tabs.find((t) => t.key === active)?.content}
        </div>
      </div>
    </section>
  );
}
