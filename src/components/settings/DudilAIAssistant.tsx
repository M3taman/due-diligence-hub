import React from 'react';
import { Card } from "@/components/ui/card";
import { DudilHeader } from "./DudilHeader";
import { DudilMessageList } from "./DudilMessageList";
import { DudilInputForm } from "./DudilInputForm";
import { useDudilAnalysis } from "@/hooks/useDudilAnalysis";

export const DudilAIAssistant = () => {
  const { messages, isLoading, handleSendMessage } = useDudilAnalysis();

  return (
    <Card className="p-6 bg-white shadow-lg rounded-xl">
      <DudilHeader />
      <DudilMessageList messages={messages} isLoading={isLoading} />
      <DudilInputForm onSubmit={handleSendMessage} isLoading={isLoading} />
    </Card>
  );
};