# Project Detail Back Button Design

## Status

Approved concept, ready for implementation planning after review.

## Context

The portfolio app has a project overview route at `/projects` and project detail routes at `/projects/:slug`. Project cards link directly to their detail route, while unknown detail slugs redirect back to `/projects`.

Project detail pages currently show the project hero content, main case-study sections, and a sticky metadata aside, but they do not provide an in-page way to return to the project list. Users can still use the browser back button or the primary navigation, but the detail page should provide a visible local navigation affordance.

## Goal

Add a calm, predictable back control to project detail pages so users can return to the project list without relying on the browser chrome.

## Non-Goals

- Do not redesign the project detail layout.
- Do not introduce breadcrumbs for the whole site.
- Do not change GitHub Pages routing, Vite `base`, or the `public/404.html` deep-link redirect behavior.
- Do not add new project content or portfolio claims.

## Recommended Approach

Use a context-aware `Back to projects` control on `ProjectDetailPage`.

The project cards should pass lightweight router state when navigating to a detail page. The detail page should use that state to decide whether pressing the control can safely call `navigate(-1)`. If the detail page was loaded directly, refreshed, or opened from an external/shared link, the control should navigate to `/projects`.

This preserves natural history behavior when the user came from the project overview and keeps deep links reliable.

## Alternatives Considered

### Static Link to `/projects`

A plain link is the simplest implementation and always works for direct URLs. It does not respect the user's actual navigation path, so it feels less native when the user arrived from the project list.

### Breadcrumb

A breadcrumb such as `Projects / ScriptSDK` would show hierarchy and provide a return path. The site structure is shallow, so a breadcrumb is heavier than the problem requires and risks adding visual noise to the focused portfolio detail pages.

## UI Design

Place the control immediately between the `PageShell` hero block and the project detail grid, aligned with the same max-width as the detail layout. This keeps the existing page hero structure intact while giving users a clear return path before they enter the case-study content.

The control should use `ArrowLeft` from `lucide-react`, a text label of `Back to projects`, and styling that matches the existing visual system:

- dark shell background
- thin border using the existing line token
- restrained hover state
- compact technical typography consistent with existing navigation and tag styles
- minimum interactive height of 44px

The control should be visually secondary, not a primary call to action.

## Interaction Design

When the user opens a project from `/projects`, the back control should return to the previous history entry. This preserves scroll position and feels like ordinary browser navigation.

When the user opens `/projects/:slug` directly, reloads the page, or lands there from outside the app, the back control should route to `/projects`.

The browser back button itself should remain unchanged.

## Component And Data Flow

`ProjectCard` should continue linking to `/projects/${project.slug}` and add route state indicating that the navigation originated from the project list.

`ProjectDetailPage` should read the router location state and obtain `navigate` from React Router. The back control handler should:

1. Call `navigate(-1)` when the trusted route state is present.
2. Call `navigate("/projects")` otherwise.

The state should be treated only as a navigation hint, not as persistent application data. It can be lost on refresh without breaking the feature because the fallback path remains valid.

## Accessibility

The control should be a real button when it performs imperative navigation. Its accessible name should be `Back to projects`, and the icon should be decorative.

Keyboard users should be able to tab to the control before entering the detail content. Focus outlines should follow existing global button/link behavior.

## Error And Edge Cases

Unknown project slugs should continue to redirect to `/projects` as they do today.

If router state is missing or malformed, the detail page should use the `/projects` fallback.

If the user opened the detail page from a search engine, bookmark, pasted URL, or GitHub Pages restored deep link, the back control should not send them away from the portfolio unexpectedly.

## Verification

Run the standard project checks after implementation:

- `npm run typecheck`
- `npm run lint`
- `npm run build`

Manual checks:

- Open `/projects`, select a project card, press `Back to projects`, and confirm the app returns to the project list.
- Open `/projects/:slug` directly in a new tab, press `Back to projects`, and confirm the app navigates to `/projects`.
- Confirm the detail page still redirects unknown slugs to `/projects`.
- Check the control on desktop and mobile widths for spacing, tap target size, and text fit.
