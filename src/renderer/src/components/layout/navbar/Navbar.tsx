import { ScrollArea, } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import classesLink from "@/components/navbar-components/NavLinksGroup.module.css";

import classes from "@/components/navbar-components/Navbar.module.css";
import { Link, useLocation } from "react-router-dom";
import { PATH_APP } from "@/routes/paths";
import { NavLinksGroup } from "@/components/navbar-components/NavLinksGroup";
import AppNavLink from "@/components/navbar-components/AppNavLink";
import { NavItem } from "@/components/navbar-components/types";

interface Props {
  data: NavItem[];
  hidden?: boolean;
}

export function Navbar({ data }: Props) {
  const links = data.map((item) => (
    <NavLinksGroup key={item.label} {...item} />
  ));

  const { pathname } = useLocation();

  return (
    <>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <Link
          to={PATH_APP.general.dashboard}
          className={`${classesLink.control} ${PATH_APP.general.dashboard === pathname && classesLink.activeControl}`}
        >
          <AppNavLink Icon={IconSettings} active={PATH_APP.general.dashboard === pathname} hasLinks={false} label={"Réglages"} opened={false} />

        </Link>
      </div>
    </>
  );
}
