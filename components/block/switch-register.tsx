import { useRegisterUserToSession, useUnregisterUserFromSession } from "../hooks/api-request";
import { Switch } from "../ui/switch";
import { useEffect, useState } from 'react';
import { toast } from "../ui/use-toast";

type SwitchRegisterInput = {
  sessionId: number,
  users: [],
  setUsers: any,
}

export default function SwitchRegister({ sessionId, users, setUsers }: SwitchRegisterInput) {

  const {
    isLoading: isLoadingCreate,
    error: errorCreate,
    registerUserToSession,
    data: sessionRegister
  } = useRegisterUserToSession();

  useEffect(() => {
    if (sessionRegister) {
      setUsers(sessionRegister.users)
    }
  }, [sessionRegister])

  const {
    isLoading: isLoadingDelete,
    error: errorDelete,
    data: sessionUnRegister,
    unregisterUserFromSession
  } = useUnregisterUserFromSession();

  const handleSwitchClick = async () => {
    if (isOwnRegistered() === true) {
      await unregisterUserFromSession(sessionId, 1)
      removeUserById(1)
    } else {
      await registerUserToSession(sessionId, 1)
    }
  };

  function isOwnRegistered(): boolean {
    return users.find(user => user.id === 1) !== undefined;
  }

  function removeUserById(userId: number) {
    const newUsers = users.filter(user => user.id !== userId);
    setUsers(newUsers)
  }

  useEffect(() => {
    if (sessionRegister && !sessionRegister?.error) {
      toast({
        typeCustom: "success",
        title: "Super !",
        description: "Vous êtes maintenant inscrit à cette session",
      })
    }
  }, [sessionRegister])

  useEffect(() => {
    if (sessionUnRegister && !sessionUnRegister?.error) {
      toast({
        typeCustom: "info",
        title: "Info",
        description: "Vous êtes êtes bien désinscrit de cette session",
      })
    }
  }, [sessionUnRegister])

  return (
    <div className={"flex"}>
      <Switch
        checked={isOwnRegistered()}
        onClick={handleSwitchClick}
        className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-400 mr-2"
      />
      <span className={"font-bold"}>INSCRIT</span>
    </div>
  );
}
