# Trust Task Conditional Logic

This document explains the conditional logic for showing/hiding trust-related tasks based on user selections.

## Overview

The Trust Details task and Trust Guarantee agreement are now conditionally shown based on three criteria:

1. **Trading Trust Business Type**: If "Trading Trust" is selected as the business type and a trust name is provided
2. **Shareholder Trust Ownership**: If a shareholder with type "Held by a trust" owns 25% or more of the company
3. **Property Trust Ownership**: If a property is owned by a trust in the Financial Position form

## Implementation Details

### 1. Context Provider (`TaskVisibilityContext.tsx`)

A React context manages the global state of trust requirements across different forms:

- Tracks trust requirements from multiple sources (business-type, shareholders, property)
- Provides methods to add/remove trust requirements
- Determines whether to show the trust task
- Provides the trust name for pre-population

### 2. Business Details Form

**File**: `src/components/Tasks/BusinessDetailsForm.tsx`

#### Trading Trust Business Type
When "Trading Trust" is selected as the business type:
- Shows simplified form with only "Trust Name" field
- Removes trustees and trust deed sections (moved to separate Trust Details task)
- Triggers trust task visibility when trust name is filled
- Trust name is automatically carried over to the Trust Details task

#### Shareholder Trust Holdings
Monitors shareholders and triggers trust task visibility when:
- A shareholder has `type === 'trust-held'`
- Their percentage is `>= 25`
- The trust name field is filled

### 3. Financial Position Form

**File**: `src/components/Tasks/FinancialPositionForm.tsx`

Monitors property ownership and triggers trust task visibility when:
- The property ownership dropdown is set to `'trust'`
- The trust name field is filled

### 4. Tasks Page

**File**: `src/pages/TasksPage.tsx`

- Filters the task list to only show the trust task when required
- Updates the trust task title to include the trust name (e.g., "Trust Details - ABC Trust")

### 5. Agreements Form

**File**: `src/components/Tasks/AgreementsForm.tsx`

- Filters the agreements list to only show trust guarantee when trust task is visible
- Updates the trust guarantee title to include the trust name

### 6. Trust Details Form

**File**: `src/components/Tasks/TrustDetailsForm.tsx`

- Pre-populates the trust name field with the value from context
- Allows users to modify the name if needed

## User Experience Flow

### Scenario 1: Trading Trust Business Type
1. User selects "Trading Trust" as business type in Business Details
2. Form shows simplified section with only "Trust Name" field
3. User enters trust name
4. Trust Details task automatically appears in the task list with the trust name
5. Trust Details task contains trustees and trust deed upload sections
6. Trust Guarantee appears in Agreements form

### Scenario 2: Shareholder or Property Trust
1. User adds a trust-held shareholder with 25%+ ownership in Business Details
   - OR user selects "Owned by a trust" for property in Financial Position
2. Trust Details task automatically appears in the task list
3. Task title shows the trust name: "Trust Details - [Trust Name]"
4. When user reaches Agreements form, Trust Guarantee appears with trust name

### Scenario 3: Removing Trust Requirement
If user removes the trust requirement (changes business type, shareholder type, or property ownership):
- Trust task disappears from the list
- Trust guarantee disappears from agreements
- Any progress in trust task is preserved if condition is met again

## Technical Benefits

- **Decoupled Logic**: Forms don't need to know about each other
- **Reactive Updates**: Changes in one form immediately affect task visibility
- **Multiple Sources**: Can trigger from business type, shareholders, or property ownership
- **Name Consistency**: Trust name is automatically synced across all relevant screens
- **Preserved State**: Form data is maintained even when tasks are hidden/shown
- **Simplified UX for Trading Trusts**: Separates basic trust info from detailed trust configuration
