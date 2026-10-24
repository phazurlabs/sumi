# Contributing to Sumi

Thanks for your interest. Please read this before opening a pull request — the CLA
requirement below is not optional and cannot be waived after the fact.

## Contributor License Agreement (required)

**Every contributor must sign the Phazur Labs Individual Contributor License Agreement
([CLA.md](CLA.md)) before their first pull request can be merged.**

If you are contributing on behalf of your employer, your employer must sign the
Corporate CLA instead. Email **legal@phazurlabs.com** to arrange this.

### Why a CLA and not just a DCO

This project is licensed under Apache-2.0. Under Apache-2.0, Phazur Labs owns its own
code but would hold only an *Apache license* to yours. That is not enough to offer this
software under any other terms later — no dual licensing, no commercial edition, no
change of license — without tracking down and getting consent from every past
contributor. That constraint is what made the Redis, HashiCorp, and Elastic relicensings
as painful as they were.

The CLA solves this by granting Phazur Labs the right to relicense. **You keep full
ownership and copyright of your contribution** — the CLA is a license grant to us, not an
assignment away from you. You can continue to use, sell, and relicense your own code
however you like.

### How to sign

Open your pull request. A CLA check runs automatically and, if you have not signed yet,
posts a comment on the PR with the document and instructions. To sign, reply on the pull
request with exactly:

```
I have read the CLA Document and I hereby sign the CLA
```

Your signature is recorded in this repository on the `cla-signatures` branch and applies
to all your future contributions to this project. The check then goes green and the pull
request becomes mergeable.

If you would rather sign out of band, email a completed [CLA.md](CLA.md) to
**legal@phazurlabs.com** and we will record it for you.

## Developer Certificate of Origin

In addition to the CLA, sign off every commit to certify you have the right to submit it:

```
git commit -s -m "your message"
```

This appends a `Signed-off-by:` trailer asserting the
[Developer Certificate of Origin](https://developercertificate.org/).

## Ground rules for contributions

- **Only submit code you have the right to submit.** Do not paste in code from another
  project, your employer, or a client engagement unless you are certain of its license
  and you disclose that license in the PR description.
- **Do not introduce GPL, AGPL, SSPL, or other copyleft dependencies.** They conflict
  with Apache-2.0 distribution. AGPL is especially disqualifying because network access
  counts as distribution. If a dependency you need is copyleft, open an issue first.
- **New source files need an SPDX header:**
  ```
  // SPDX-License-Identifier: Apache-2.0
  ```
- **Do not add or alter LICENSE, NOTICE, or TRADEMARKS.md** in a pull request. Those are
  maintained by Phazur Labs.

## Process

1. Open an issue describing the change before starting non-trivial work.
2. Fork, branch, and keep pull requests focused on one concern.
3. Include tests for behavior changes.
4. Ensure the build, tests, and linter pass locally.
5. Sign the CLA and sign off your commits.

## Security

Do not report security issues through public issues or pull requests. See
[SECURITY.md](SECURITY.md).

## Trademarks

Contributing does not grant you any right to use the Phazur Labs name or marks. See
[TRADEMARKS.md](TRADEMARKS.md).
