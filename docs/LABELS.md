# Labels ↔ Notion mapping

GitHub is the source of truth. Core labels are lowercase. `CODER` and `Business/Marketing_Tasks` keep Hope's names (they are routing signals). Notion option names were **not** renamed, to avoid data loss. The sync translates.

| GitHub label | Notion **Type** | Notion **Assignee** | Meaning |
|---|---|---|---|
| `Business/Marketing_Tasks` | Business/Marketing | Trainee | Trainee task; Hope verifies (*Verified by Hope*) |
| `CODER` | (from other labels, usually Website) | AI coder | Pickup signal for AI coders **when Ready** on the board |
| `bug` | Bug | – | Something broken |
| `client` | Client | – | Client-level work (tracking issues, proposals) |
| `website` | Website | – | Design/build/launch work |
| `admin` | Admin | Hope (if no other rule) | Coordination, domain, assets, handoff |
| `type:bug` | Bug (only if none of the above) | – | Detail label |
| `documentation` | Admin | – | Internal docs backlog |
| `client-waiting` | – | Hope | Waiting on the client |
| `status:in-review` | Status stays **Doing** | – | Set by the `coder-pr-handoff` Action when a PR says `Closes #N` |
| `blocked`, `type:*`, `phase:*` | – | – | Detail only |

The first matching row wins, top to bottom. **Status:** issue closed → Done; board Backlog/Ready → Backlog; In progress/In review → Doing.
