"use client";
import React, { useEffect, useState } from "react";
import baroqueBorder from "@/public/baroqueborder.png";
import Image from "next/image";
import HouseBanner from "@/components/ui/house-banner";
import { AtSign, Edit, Loader2, Octagon, Plus, User, X } from "lucide-react";
import Link from "next/link";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";

const Member = ({
  member,
  setMembers,
}: {
  member: {
    name: string;
    email: string;
  };
  setMembers: React.Dispatch<
    React.SetStateAction<{ name: string; email: string }[]>
  >;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteMember() {
    try {
      setIsDeleting(true);
      const response = await fetch(
        `/api/manage-members?email=${member.email}`,
        {
          method: "DELETE",
        },
      );
      const data = await response.json();
      if (response.ok) {
        setMembers(data.members);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="shadow-md bg-white p-4 rounded-md flex justify-between">
      <div>
        <div className="flex items-center gap-1">
          <User className="w-4 h-4" />
          {member.name}
        </div>
        <div className="flex items-center gap-1">
          <AtSign className="w-4 h-4" /> {member.email}
        </div>
      </div>
      <div>
        <Button
          onClick={() => {
            deleteMember();
          }}
          variant="destructive"
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <X className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

const page = () => {
  const [toggleMembers, setToggleMembers] = useState(false);

  const [team, setTeam] = useState<{
    name: string;
    leader_name: string;
    house: "Hufflepuff" | "Gryffindor" | "Ravenclaw" | "Slytherin";
  }>({
    name: "",
    leader_name: "",
    house: "Hufflepuff",
  });

  const [teamForm, setTeamForm] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

  const [members, setMembers] = useState<
    {
      name: string;
      email: string;
    }[]
  >([]);

  const [createLoading, setCreateLoading] = useState(false);

  async function getTeam() {
    try {
      const response = await fetch("/api/team");
      const data = await response.json();
      if (response.ok) {
        setTeam(data.team);
        setMembers(data.team.members);
      }
    } catch (error) {
      throw error;
    }
  }

  async function addMember() {
    try {
      if(teamForm.name === "") {
        toast("Name of member is required", { type: "error" });
        return;
      }
      if(teamForm.email === "") {
        toast("Email of member is required", { type: "error" });
        return;
      }
      setCreateLoading(true);
      const response = await fetch(`/api/manage-members`, {
        method: "POST",
        body: JSON.stringify({
          name: teamForm.name,
          email: teamForm.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        // reset the form
        setTeamForm({ name: "", email: "" });
        setMembers(data.members);
        toast("Added member to the team", { type: "success" });
      } else {
        toast(data.message, { type: "error" });
      }
    } catch (error: any) {
      toast(error.response.message, { type: "error" });
    } finally {
      setCreateLoading(false);
    }
  }

  useEffect(() => {
    getTeam().then(() => {
      console.log("Fetched the team.");
    });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Modal
        title="Manage Team Members 👥"
        open={toggleMembers}
        onClose={() => {
          setToggleMembers(false);
        }}
      >
        <div className="flex flex-col gap-2 mt-4">
          {members.length < 4 ? (
            <div className="grid grid-cols-[3fr_3fr_1fr] gap-1">
              <Input
                className=""
                placeholder="Name"
                value={teamForm.name}
                onChange={(event) => {
                  setTeamForm((prev) => ({
                    ...prev,
                    name: event.target.value,
                  }));
                }}
              />
              <Input
                placeholder="Email"
                value={teamForm.email}
                onChange={(event) => {
                  setTeamForm((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }));
                }}
              />
              <Button onClick={addMember} variant="hackwarts">
                {createLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </Button>
            </div>
          ) : (
            <div className="text-rosewood flex justify-center items-center gap-2">
              <Octagon className="w-4 h-4" />
              Max team members reached
            </div>
          )}
          {members.map((member, index) => (
            <Member
              key={`member-${index}`}
              member={member}
              setMembers={setMembers}
            />
          ))}
        </div>
      </Modal>

      <div className="relative p-10 mt-10 flex gap-10">
        {/* add baroque borders to the corners of the div apply scaling and inversing */}
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute -top-4 -left-2 h-12 w-auto"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -bottom-4 -left-2 -scale-y-100"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -top-4 -right-2 -scale-x-100"
        />
        <Image
          src={baroqueBorder}
          alt="Baroque border"
          className="absolute h-12 w-auto -bottom-4 -right-2 -scale-y-100 -scale-x-100"
        />
        <div>
          <div className=" text-yellow-500 text-harryp mb-2 text-4xl">
            {team.name}
          </div>
          <div className="text-white text-lg mb-2">
            <span className="font-bold">Team Leader: </span>{" "}
            <span>{team.leader_name}</span>
          </div>
          <div className="mb-2">
            <div className="text-white font-bold text-lg flex items-center gap-2">
              Team members list
              <button
                onClick={() => {
                  setToggleMembers(true);
                }}
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div>
              {members.map((member, index) => (
                <div key={`member-list-${index}`} className="flex items-center">
                  <User className="w-4 h-4" /> {member.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <HouseBanner house={team.house} />
      </div>
    </div>
  );
};

export default page;
