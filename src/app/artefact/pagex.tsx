"use client";

import { Artefact } from "@/types";
import { DownloadIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { JubarexContext, JubarexContextType } from "../context";

export default function Artefacts() {
  const {
    user,
    setUser,
    userProfile,
    setUserProfile,
    logout,
    refreshUserFromToken,
  } = useContext(JubarexContext) as JubarexContextType;

  const [artefacts, setArtefacts] = useState<Artefact[]>([]);

  const download = async (artefactId: string, artefactName: string) => {
    //get token to session
    const accessToken = await localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found on cache, return to login");
      await logout();
    }

    // get profile
    const artefactsResponse = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/artefact/" + artefactId + "/file",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
      }
    );
    const fileBlob = await artefactsResponse.blob();

    const headers = new Headers();
    // remember to change the filename here
    headers.append(
      "Content-Disposition",
      'attachment; filename="' + artefactName + '"'
    );
    headers.append(
      "Content-Type",
      "application/" + artefactName.split(".").pop()
    );

    return new Response(fileBlob, {
      headers,
    });
  };

  const refreshArtefacts = async () => {
    //get token to session
    const accessToken = await localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No access token found on cache, return to login");
      await logout();
    }

    // get profile
    const artefactsResponse = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/artefact",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken,
        },
      }
    );
    const artefacts: Artefact[] = await artefactsResponse.json();
    setArtefacts(artefacts);
  };

  useEffect(() => {
    (async () => await refreshArtefacts())();
  }, []);

  return (
    <section className="relative">
      <table>
        <tr>
          <th>ID</th>
          <th>title</th>
          <th>owner</th>
          <th>thumbnail</th>
          <th>year</th>
          <th>createdBy</th>
        </tr>
        {artefacts! && artefacts.length > 0
          ? artefacts.map((artefact) => (
              <tr key={artefact._id}>
                <td>{artefact._id}</td>
                <td>{artefact.title}</td>
                <td>{artefact.owner}</td>
                <td>
                  <button
                    onClick={() => download(artefact._id, artefact.fileUrl)}
                  >
                    <DownloadIcon size={24} />
                  </button>
                </td>
                <td>{artefact.year}</td>
                <td> {artefact.createdBy.email}</td>
              </tr>
            ))
          : "No artefacts"}
      </table>
    </section>
  );
}
