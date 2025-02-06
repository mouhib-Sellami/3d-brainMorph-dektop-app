
import {
  Collapse,
  UnstyledButton,
} from "@mantine/core";
import React, { useState } from "react";
import classes from "./NavLinksGroup.module.css";
import { Link, useLocation } from "react-router-dom";
import AppNavLink from "./AppNavLink";
import { LinksGroupProps } from "./types";



export function NavLinksGroup({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  links,
  isVisible
}: LinksGroupProps) {
  const { pathname } = useLocation();

  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);

  React.useEffect(() => {
    autoOpenNav()
  }, [pathname, link])

  const autoOpenNav = React.useCallback(() => {
    if (!hasLinks)
      return

    const check = links.findIndex(elm => elm.link === pathname);
    setOpened(check != -1);
  }, [pathname, links, hasLinks])

  const items = (hasLinks ? links : []).map((link) => {
    if (link?.isVisible != false)
      return (
        <Link
          to={link.link}
          key={link.label}
          className={`${classes.link} ${link.link === pathname && classes.activeLink}`}
        >
          {link.label}
        </Link>
      );
  });

  return (
    <>
      {isVisible ?
        <>
          {
            link ? (
              <Link
                to={link}
                className={`${classes.control} ${link === pathname && classes.activeControl}`}
              >
                <AppNavLink Icon={Icon} active={link === pathname} hasLinks={false} label={label} opened={false} />
              </Link >
            ) : (
              <UnstyledButton
                onClick={() => {
                  if (hasLinks) {
                    setOpened((o) => !o);
                    return;
                  }
                }}
                className={classes.control}
              >
                <AppNavLink Icon={Icon} active={link === pathname} hasLinks={hasLinks} label={label} opened={opened} />
              </UnstyledButton>
            )
          }
          {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
        : null}
    </>
  );
}
