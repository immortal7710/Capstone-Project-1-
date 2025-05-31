import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ResumeBuilder = () => {
  const [tab, setTab] = useState("personal");
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  });

  const [education, setEducation] = useState([
    { degree: "", institution: "", year: "" },
  ]);

  const [experience, setExperience] = useState([
    { jobTitle: "", company: "", duration: "", description: "" },
  ]);

  const [projects, setProjects] = useState([
    { title: "", description: "", link: "" },
  ]);

  const [skills, setSkills] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleChange = <T extends object>(
    state: T,
    setState: React.Dispatch<React.SetStateAction<T>>,
    field: keyof T,
    value: any
  ) => {
    setState({ ...state, [field]: value });
  };

  const handleArrayChange = <T extends object>(
    array: T[],
    setArray: React.Dispatch<React.SetStateAction<T[]>>,
    index: number,
    field: keyof T,
    value: any
  ) => {
    const updated = [...array];
    updated[index][field] = value;
    setArray(updated);
  };

  const addEntry = <T extends object>(
    array: T[],
    setArray: React.Dispatch<React.SetStateAction<T[]>>,
    emptyEntry: T
  ) => {
    setArray([...array, emptyEntry]);
  };

  const handleSubmit = () => {
    if (!personalInfo.name) {
      nameRef.current?.focus();
      return;
    }
    if (!personalInfo.email) {
      emailRef.current?.focus();
      return;
    }
    if (!personalInfo.phone) {
      phoneRef.current?.focus();
      return;
    }

    console.log("Resume submitted:", {
      personalInfo,
      education,
      experience,
      projects,
      skills,
    });
  };

  const tabs = ["personal", "education", "experience", "projects", "skills"];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Resume Builder</h1>

      <div className="flex space-x-4 mb-4">
        {tabs.map((label) => (
          <Button
            key={label}
            variant={tab === label ? "default" : "outline"}
            onClick={() => setTab(label)}
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Button>
        ))}
      </div>

      {tab === "personal" && (
        <Card className="mb-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <Input
              placeholder="Name *"
              value={personalInfo.name}
              onChange={(e) => handleChange(personalInfo, setPersonalInfo, "name", e.target.value)}
              className="mb-4"
              ref={nameRef}
            />
            <Input
              placeholder="Email *"
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleChange(personalInfo, setPersonalInfo, "email", e.target.value)}
              className="mb-4"
              ref={emailRef}
            />
            <Input
              placeholder="Phone *"
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => handleChange(personalInfo, setPersonalInfo, "phone", e.target.value)}
              className="mb-4"
              ref={phoneRef}
            />
            <Input
              placeholder="LinkedIn (optional)"
              value={personalInfo.linkedin}
              onChange={(e) => handleChange(personalInfo, setPersonalInfo, "linkedin", e.target.value)}
              className="mb-4"
            />
            <Input
              placeholder="GitHub (optional)"
              value={personalInfo.github}
              onChange={(e) => handleChange(personalInfo, setPersonalInfo, "github", e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end">
              <Button onClick={() => setTab("education")}>Next</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "education" && (
        <div>
          {education.map((edu, index) => (
            <Card key={index} className="mb-4">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Education {index + 1}</h2>
                <Input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleArrayChange(education, setEducation, index, "degree", e.target.value)}
                  className="mb-4"
                />
                <Input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleArrayChange(education, setEducation, index, "institution", e.target.value)}
                  className="mb-4"
                />
                <Input
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) => handleArrayChange(education, setEducation, index, "year", e.target.value)}
                />
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-between">
            <Button onClick={() => setTab("personal")}>Back</Button>
            <Button onClick={() => addEntry(education, setEducation, { degree: "", institution: "", year: "" })}>Add Education</Button>
            <Button onClick={() => setTab("experience")}>Next</Button>
          </div>
        </div>
      )}

      {tab === "experience" && (
        <div>
          {experience.map((exp, index) => (
            <Card key={index} className="mb-4">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Experience {index + 1}</h2>
                <Input
                  placeholder="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) => handleArrayChange(experience, setExperience, index, "jobTitle", e.target.value)}
                  className="mb-4"
                />
                <Input
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => handleArrayChange(experience, setExperience, index, "company", e.target.value)}
                  className="mb-4"
                />
                <Input
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => handleArrayChange(experience, setExperience, index, "duration", e.target.value)}
                  className="mb-4"
                />
                <Textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => handleArrayChange(experience, setExperience, index, "description", e.target.value)}
                />
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-between">
            <Button onClick={() => setTab("education")}>Back</Button>
            <Button onClick={() => addEntry(experience, setExperience, { jobTitle: "", company: "", duration: "", description: "" })}>Add Experience</Button>
            <Button onClick={() => setTab("projects")}>Next</Button>
          </div>
        </div>
      )}

      {tab === "projects" && (
        <div>
          {projects.map((proj, index) => (
            <Card key={index} className="mb-4">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Project {index + 1}</h2>
                <Input
                  placeholder="Project Title"
                  value={proj.title}
                  onChange={(e) => handleArrayChange(projects, setProjects, index, "title", e.target.value)}
                  className="mb-4"
                />
                <Input
                  placeholder="Project Link"
                  value={proj.link}
                  onChange={(e) => handleArrayChange(projects, setProjects, index, "link", e.target.value)}
                  className="mb-4"
                />
                <Textarea
                  placeholder="Description"
                  value={proj.description}
                  onChange={(e) => handleArrayChange(projects, setProjects, index, "description", e.target.value)}
                />
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-between">
            <Button onClick={() => setTab("experience")}>Back</Button>
            <Button onClick={() => addEntry(projects, setProjects, { title: "", description: "", link: "" })}>Add Project</Button>
            <Button onClick={() => setTab("skills")}>Next</Button>
          </div>
        </div>
      )}

      {tab === "skills" && (
        <Card className="mb-4">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <Textarea
              placeholder="List your skills separated by commas"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-between">
              <Button onClick={() => setTab("projects")}>Back</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResumeBuilder;
