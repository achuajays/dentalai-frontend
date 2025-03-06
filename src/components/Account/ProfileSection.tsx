
import React from "react";

interface ProfileSectionProps {
  title: string;
  component: React.ReactNode;
}

const ProfileSection = ({ title, component }: ProfileSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium text-blue-800 mb-3">{title}</h3>
      {component}
    </div>
  );
};

export default ProfileSection;
