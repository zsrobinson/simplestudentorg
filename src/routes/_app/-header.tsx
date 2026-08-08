import { getRouteApi, useLocation, useNavigate } from "@tanstack/react-router";
import { PlusIcon, SlashIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { MOCK_ORGS } from "~/lib/constants";

const route = getRouteApi("/_app");

export function AppHeader() {
  const { user } = route.useRouteContext();

  return (
    <header className="fixed inset-x-0 top-0 flex justify-between border-b py-2 px-4 items-center">
      <div className="flex gap-2 items-center">
        <h1 className="text-xl font-semibold">Simple Student Org</h1>
        <SlashIcon className="-rotate-15 text-border" size={20} />
        <OrgSwitcher />
      </div>
      <span className="font-mono">{user.email}</span>
    </header>
  );
}

function OrgSwitcher() {
  const navigate = useNavigate();
  const pathname = useLocation({ select: (l) => l.pathname });
  const items = [...MOCK_ORGS, { label: "New", value: "new" }];

  return (
    <Select
      items={items}
      value={pathname.split("/").at(1)}
      onValueChange={(value) => {
        if (typeof value !== "string") return;
        if (value === "new") return navigate({ to: "/new" });
        return navigate({ to: "/$org", params: { org: value } });
      }}
    >
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {MOCK_ORGS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>

        <SelectGroup>
          <SelectItem value="new">
            <span className="flex items-center gap-1">
              <PlusIcon />
              <span>New</span>
            </span>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
