
# Konty dataLayer specification / GA4 (eng)

## GA4 - dataLayer custom events implementation guide

**Konty**
www.konty.rs

**Author:** Granular group
www.granulargroup.com
http://www.granulargroup.com

---

## Table of Contents
1. About dataLayer - quick information
2. dataLayer implementation basics
3. dataLayer implementation - important
4. Custom events for Konty
   - General Rule

---

## About dataLayer - quick information

### dataLayer implementation basics

`dataLayer` is an object used to communicate between the system and the tracking tag management system, which is, in this case, Google Tag Manager. GTM listens only to the `push` method described below.

The `dataLayer` needs to be invoked as early as possible in the `<head>` section, preferably before placing the GTM code part 1 snippet, which allows the implementation to fire tags as early as possible, thus reducing race issues.

#### Empty dataLayer object example:
```html
<script>
window.dataLayer = window.dataLayer || [];
</script>
```

#### Pushing values to the dataLayer object as early as possible:
```html
<script>
window.dataLayer = window.dataLayer || [];

dataLayer.push({
    'key_a': 'value',
    'key_b': 'value'
});
</script>
```

#### Pushing values to dataLayer object within a script/function:
When pushing values to dataLayer after GTM is ready (basically all instances where dataLayer is placed after the GTM snippet is placed or when tracking user interactions (clicks / popups / time / hover / AJAX response and similar)):

```html
<script>
dataLayer.push({
  'event': 'event_name', // 'event' is inside reserved namespace
  'key_a': 'value',
  'key_b': 'value'
});
</script>
```

👉 More information: [Google Tag Manager dataLayer docs](https://developers.google.com/tag-platform/tag-manager/web/datalayer)

---

## dataLayer implementation - important

### Check:
1. Will the dataLayer object always be available at the time the hit is sent to the Google Analytics server (racing issue)?
2. What needs to be sent with the initial Pageview, and what can be sent subsequently (pageview → event → event)?
3. `dataLayer` is not persistent across pages – any key value pair needed to track persistent values needs to be pushed on each page or stored in local/sessionStorage or cookies.

### Keep in mind:
- **Consistency** – ensure essential elements (product names, IDs, categories, etc.) are consistent across all dataLayer variables.
- **Testing** – to test if dataLayer is implemented correctly, use the browser console or the [Chrome extension DataLayer Checker](https://chrome.google.com/webstore/detail/datalayer-checker/ffljdddodmkedhkcjhpmdajhjdbkogke).

---

## Custom events for Konty

Events related to tracking user interactions are specified in the measurement plan.

📄 [Measurement plan GA4 - Konty](https://docs.google.com/spreadsheets/d/1Z1c1cmGMlQm6dvE-z_seFQnV6KremRsm8Gja6uLFXhM/edit?usp=sharing)

### General Rule
- Every custom event must be pushed into `window.dataLayer` in the specified format.
- The structure of keys must always be the same – even if some values are missing.
  - Use **'N/A'** for missing text values.
  - Use **0.00** for missing numeric values (without quotes).

📌 **PII fields (e.g., name, email, phone) can be included in the dataLayer but must NOT be sent directly to GA4.**
In GA4, only non-PII values should be passed (e.g., form type, form location).

- Event names should always use **lowercase snake_case** (e.g., `contact_us`, `request_demo`).
- Each form submission or interaction should trigger exactly **one dataLayer push**.

Measurement plan

| Action | Code | Example |
|--------|------|---------|
| **Get a Demo CTA** | `dataLayer.push({ 'event': 'get_a_demo_cta', 'page_url': '$url' });` | https://prnt.sc/MPThxP-1wkC_ |
| **Get Started** | `dataLayer.push({ 'event': 'get_started', 'category': '$kategorija usluge', //Ugostiteljstvo ili Trgovina 'label': '$vrsta paketa'. //Start, Standard ili Premium });` | https://prnt.sc/xTbhVf_C2Vtg |
| **Book a Demo Form** | `dataLayer.push({ 'event': 'book_a_demo_form' });` | https://prnt.sc/a1GsoDj3214n |
| **Newsletter subscription** | `dataLayer.push({ 'event': 'newsletter_subscription' });` | https://prnt.sc/39o5Nq6YFXry |
| **Download** | `dataLayer.push({ 'event': 'download', 'category': '$version', //Demo ili Full 'label': '$technology'. //Windows, Android, Mac });` | https://prnt.sc/DXqcmrtNlsGx |
| **30 days free CTA** | `dataLayer.push({ 'event': '30_days_free_cta' });` | https://prnt.sc/cOMElxUyKxTO |
