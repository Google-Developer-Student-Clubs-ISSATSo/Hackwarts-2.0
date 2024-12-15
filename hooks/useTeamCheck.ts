import { useState, useEffect } from "react";

export function useTeamCheck(email: string | null | undefined) {
  const [hasTeam, setHasTeam] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkTeam() {
      if (!email) {
        setHasTeam(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/check-team?email=${email}`);
        const data = await response.json();
        setHasTeam(data.hasTeam);
      } catch (error) {
        setHasTeam(false);
      }
      setLoading(false);
    }

    checkTeam();
  }, [email]);

  return { hasTeam, loading };
}