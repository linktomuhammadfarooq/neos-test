import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeadingH1 } from "./HeadingH1";

interface TabsHeaderProps {
  title: string;
  firstTabValue: string;
  firstTabLabel: string;
  secondTabValue: string;
  secondTabLabel: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsHeader: React.FC<TabsHeaderProps> = ({
  title,
  firstTabLabel,
  firstTabValue,
  secondTabLabel,
  secondTabValue,
  activeTab,
  setActiveTab,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <HeadingH1 title={title} />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-gray-100 rounded-md p-1">
            <TabsTrigger
              value={firstTabValue}
              className="rounded-md px-6 py-1.5 data-[state=active]:bg-white"
            >
              {firstTabLabel}
            </TabsTrigger>
            <TabsTrigger
              value={secondTabValue}
              className="rounded-md px-6 py-1.5 data-[state=active]:bg-white"
            >
              {secondTabLabel}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  );
};

export default TabsHeader;
