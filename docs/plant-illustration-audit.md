# Plant illustration audit

Reviewed 27 September 2026 · 26 plant assets mapped from `src/plants.js` · baseline commit `b556ada`

**Update, 27 September 2026:** The eight illustrations rated “Priority rework” below have been regenerated and replaced in `assets/`. The game now displays complete images with `object-fit: contain`. This report records the original findings and the briefs used for those replacements; its “Observed” descriptions refer to the original artwork. The other 18 ratings remain current. The generated replacements have been visually checked against the cited descriptions, but their identification value has not been measured with users or confirmed by a botanist.

**The original set was not reliable for learning plant identification from illustrations alone.** My baseline editorial assessment was **8 priority reworks, 14 targeted refinements, and 4 broadly usable illustrations**. These ratings assess the original artwork, not measured recognition rates; no user recognition study was performed.

I visually inspected every original PNG and compared the depicted foliage, arrangement, proportions, flowers, and growth form with the botanical descriptions linked below. Scientific names are inferred from the common names and South Bay marsh context: the application currently records no scientific names. Ambiguous identifications are explicitly marked. Reference dimensions describe real plants, not measurements inferred from image pixels; they vary with age, environment, and botanical treatment.

## Changes affecting the entire set

1. **Stop cropping diagnostic features.** The original `src/styles.css:219` used `object-fit: cover`. At the inspected 1280 × 720 desktop viewport, the top image box was about 460 × 523 px, versus a 2400 × 1792 source. Only about 66% of the source width fit: approximately 17% was cropped from each side. The card now uses `contain`, but the new layout still needs recognition testing at phone size. This was a verified desktop measurement, not a complete mobile audit.
2. **Add a scale reference.** Equal-sized cards currently show a whole shrub, a small sprig, or a single flower head without indicating magnification. Add a plant-height cue and a leaf/detail scale bar. One scale bar cannot apply simultaneously to differently magnified insets.
3. **Record the intended taxon and illustrated stage.** Resolve Mustard, Tule Reed, Pampas Grass, Russian Thistle, Wild Radish, and the marsh gumplant variety before approving exact species-level details. A common-name group may be a valid game category, but it cannot promise one exact species identification.
4. **Use a whole-plant view plus one diagnostic close-up.** Preserve leaf attachment and arrangement, margins, thickness, and reproductive structures. Avoid making flower color the only difference between cards. Include a nonflowering view when flowers currently carry almost all recognition.
5. **Make fine detail readable at card size.** Fennel, sagebrush, pampas grass, and Russian thistle use especially pale or thin lines. Test the final composition at mobile size, with the plant name hidden, against a second real specimen rather than the same illustration.

## Priority order

| Priority | Plants | Reason |
|---|---|---|
| Rework first — 8 | Perennial Pepperweed; Fennel; Slender Iceplant; Tule Reed; Pacific Cordgrass; Brass-Buttons; Western Goldenrod; Stinkwort | Misleading features, missing diagnostic structure, or a strongly generic depiction |
| Refine — 14 | Pickleweed; Western Marsh Rosemary; Marsh Gumplant; California Sagebrush; Saltgrass; Alkali Heath; Salty Susan; Yellow Starthistle; Pampas Grass; Mustard; Russian Thistle; Poison Hemlock; Wild Radish; Hottentot Fig | Recognizable cues exist, but proportions, details, stage coverage, or taxon clarity need work |
| Broadly usable — 4 | California Poppy; Common Yarrow; Coyote Brush; Australian Saltbush | Main identifying combination is represented; still needs the shared scale and display improvements |

## Plant-by-plant findings

### 01. Pickleweed

**Refine · High confidence in the feature correction.** Assumed taxon: *Salicornia pacifica* (also treated as *Sarcocornia pacifica*).

Artwork: [PICKLEWEED.png](../assets/PICKLEWEED.png)

**Reference:** Fleshy, jointed, oppositely branching shoots; leaves are reduced to minute scales. The perennial plant forms mats from rhizomes; the Burke treatment describes stems to about 30 cm tall.

**Observed:** The jointed succulent outline works well. Repeated projecting oval appendages at the nodes read as substantial separate leaves, and the isolated upright specimen does not convey a spreading mat.

**Correction:** Reduce the apparent leaves to tiny collars/scales; retain the fleshy segments. Add a low branching base or small mat silhouette. Do not give it iceplant-like leaf blades.

Sources: [University of Washington, Burke Herbarium](https://burkeherbarium.org/imagecollection/taxon.php?Taxon=Salicornia+pacifica).

### 02. California Poppy

**Broadly usable · High confidence.** Assumed taxon: *Eschscholzia californica*.

Artwork: [CALIFORNIA_POPPY.png](../assets/CALIFORNIA_POPPY.png)

**Reference:** Divided foliage, solitary cup-shaped flowers, and the rim below the petals are useful together. Leaf size and dissection change with age and position, so one uniform leaf-size target would be misleading.

**Observed:** Orange cup, rim, and finely divided blue-green foliage form a convincing combination. The foliage is simplified but does not introduce an obvious wrong leaf type.

**Correction:** Keep the core drawing. Make four petals unambiguous when revising it; add a true unopened, capped bud or narrow seed capsule and a leaf scale inset if teaching identification beyond the flowering stage.

Sources: [San Diego State University botanical images](https://plants.sdsu.edu/sdpls/plants/Eschscholzia_californica/), [California poppy morphology review](https://pmc.ncbi.nlm.nih.gov/articles/PMC10017456/).

### 03. Western Marsh Rosemary

**Refine · Medium confidence in proportional criticism.** Assumed taxon: *Limonium californicum*.

Artwork: [MARSH_ROSEMARY.png](../assets/MARSH_ROSEMARY.png)

**Reference:** Broad, leathery basal leaves and a largely leafless branched flowering stalk. UC Irvine describes blades commonly 5–20 cm long and flowers about 5–6 mm long, while also documenting smaller-leaved plants.

**Observed:** Basal rosette and lavender spray are correct cues. The rosette is visually subordinate, while flowers are evenly spaced like individual terminal blossoms; the dense small flower groupings at branch ends are not very clear.

**Correction:** Give the leathery rosette more prominence and show grouped tiny flowers along the terminal branches. Keep the stalk free of large stem leaves. Avoid treating the current rosette proportions as definitively impossible: the species varies.

Sources: [UC Irvine, local field description](https://nathistoc.bio.uci.edu/Plants%20of%20Upper%20Newport%20Bay%20(Robert%20De%20Ruff)/Plumbaginaceae/Limonium%20californicum.htm).

### 04. Marsh Gumplant

**Refine · Medium confidence; resolve variety.** Likely taxon: *Grindelia stricta* var. *angustifolia*.

Artwork: [MARSH_GUMPLANT.png](../assets/MARSH_GUMPLANT.png)

**Reference:** Bay-margin gumplant is a shrubby, narrow-leaved form. Yellow composite heads and recurved involucral bracts are useful; leaf margins and habit vary within the California *Grindelia* complex.

**Observed:** Yellow heads and curled green bracts are strong. The large, sharply toothed leaves and single herbaceous sprig are less specific to the intended bayshore variety. There is no visible resin-covered unopened bud.

**Correction:** Match foliage to a confirmed local specimen, add a sticky pale-resin bud, and include the shrubby base. Do not simply remove all teeth: the issue is taxon-specific proportion and the absence of another strong cue.

Sources: [CNPS Marin, bayshore gumplant](https://cnpsmarin.org/2009-2012-plants-of-the-month/), [research on the California Grindelia complex](https://pmc.ncbi.nlm.nih.gov/articles/PMC3995713/).

### 05. California Sagebrush

**Refine · High confidence in readability; medium in leaf interpretation.** Assumed taxon: *Artemisia californica*.

Artwork: [CALIFORNIA_SAGEBRUSH.png](../assets/CALIFORNIA_SAGEBRUSH.png)

**Reference:** A woody-based shrub with very narrow foliage; the Forest Service describes leaves about 2–5 cm long and 0.5–1 mm wide. Small heads occur in branched inflorescences.

**Observed:** Fine gray foliage suggests sagebrush, but the almost unfilled line drawing loses mass and leaf boundaries. Repeated divisions can read as tiny fern fronds. The woody shrub habit is absent from the isolated branch.

**Correction:** Use clearer gray-green leaf mass, distinguish a few long narrow leaf divisions from branchlets, and show a woody base or shrub silhouette. Keep flower heads small and inconspicuous.

Sources: [US Forest Service botanical description](https://research.fs.usda.gov/feis/species-reviews/artcal).

### 06. Saltgrass

**Refine · Medium confidence.** Assumed taxon: *Distichlis spicata*.

Artwork: [SALT_GRASS.png](../assets/SALT_GRASS.png)

**Reference:** Stiff pointed leaves in two ranks, a compact inflorescence, and creeping rhizomes. Leaf blades are commonly about 2–12 cm long and 1–3.5 mm wide in the Forest Service treatment.

**Observed:** Rhizome, stiff blades, and two-ranked arrangement are useful. Some blades look broad and lance-shaped; the head reads as a generic grain spike, without clearly grouped multi-flowered spikelets.

**Correction:** Narrow the blades and clarify their sheathing bases. Draw a compact cluster of actual spikelets, with a detail inset if necessary. Preserve the rhizome, which helps distinguish its habit from a tussock grass.

Sources: [US Forest Service](https://research.fs.usda.gov/feis/species-reviews/disspi), [Native Plant Trust, spikelet characters](https://gobotany.nativeplanttrust.org/species/distichlis/spicata/).

### 07. Alkali Heath

**Refine · Medium confidence.** Assumed taxon: *Frankenia salina*.

Artwork: [ALKALI_HEATH.png](../assets/ALKALI_HEATH.png)

**Reference:** Small opposite leaves, often with rolled-under margins, and pink flowers seated in a ribbed tubular calyx. Flora of North America gives blades about 3–13.5 mm long; shapes range from broader obovate forms to narrow ones.

**Observed:** Sprawling form and pink flowers fit. Most leaves are drawn as thin fingers in star-like groups; opposite pairs, rolled margins, and the elongated calyx are difficult to read. The source image's wide spread is vulnerable to card cropping.

**Correction:** Show a clear opposite pair with broader blades as well as narrow upper foliage, and enlarge one rolled leaf and one tubular flower base. Thin leaves alone are not grounds to call this the wrong species.

Sources: [Flora of North America](https://www.efloras.org/florataxon.aspx?flora_id=1&taxon_id=250101262), [Prigge & Gibson, regional botanical treatment](https://www.smmflowers.org/bloom/ANF-descriptions/Frankenia_salina_UCLA_SantaMonicas.pdf).

### 08. Common Yarrow

**Broadly usable · High confidence.** Assumed taxon: *Achillea millefolium* complex.

Artwork: [COMMON_YARROW.png](../assets/COMMON_YARROW.png)

**Reference:** Finely divided, feather-like leaves and a relatively flat cluster of small pale flower heads. Leaf size is variable; the Burke/FNA account spans 3.5–35+ cm in length.

**Observed:** The long feather-shaped leaf outline and pale clustered heads are recognizable together. Flowers are somewhat prominent, but the plant does not look like a generic broad-leaved daisy.

**Correction:** Keep. On revision, reduce the apparent size of individual heads slightly and preserve the flat overall cluster. A basal leaf inset would support nonflowering recognition. The image alone cannot establish native versus introduced ancestry within this complex.

Sources: [Burke Herbarium](https://burkeherbarium.org/imagecollection/taxon.php?Taxon=Achillea+millefolium), [US Forest Service field guide](https://www.fs.usda.gov/rm/pubs_other/rmrs_2013_utz_j001.pdf).

### 09. Salty Susan

**Refine · Medium confidence.** Assumed taxon: *Jaumea carnosa*.

Artwork: [SALTY_SUSAN.png](../assets/SALTY_SUSAN.png)

**Reference:** Opposite, fleshy, narrow-oblong to spoon-shaped leaves on spreading shoots. Burke describes leaves 2–6 cm × 2–6 mm and solitary yellow heads with small, inconspicuous rays.

**Observed:** Creeping/rooting base, succulent-looking foliage, and yellow heads help. Leaf pairing is inconsistent to the eye, and the exaggerated stacked green bracts make each head look like a small leafy cone.

**Correction:** Make opposite leaf attachment unmistakable at several exposed nodes. Show rounded succulent thickness, simplify the head's bracts to the correct cup, and depict the small yellow rays. Preserve the spreading habit.

Sources: [Burke Herbarium](https://burkeherbarium.org/imagecollection/taxon.php?Taxon=Jaumea+carnosa), [Flora of North America, Jaumea](https://efloras.org/florataxon.aspx?flora_id=1&taxon_id=116777).

### 10. Tule Reed

**Priority rework · High confidence if hardstem tule is intended; taxon unresolved.** Assumed comparison: *Schoenoplectus acutus* var. *occidentalis*.

Artwork: [TULE_REED.png](../assets/TULE_REED.png)

**Reference:** Tall cylindrical culms, basal sheaths with reduced blades, and branched groups of compact ovoid spikelets. FNA gives culms 1–4 m tall and 2–10 mm thick; an erect bract makes the inflorescence appear lateral.

**Observed:** Long thin grass-like foliage and feathery brown sprays dominate. The compact ovoid spikelets and near-tip continuation of the stem-like bract are not convincingly represented. It reads as a generic flowering rush/sedge.

**Correction:** Resolve whether hardstem, California, or another tule is intended. For hardstem tule, draw stout round green culms, reduced basal leaves, compact brown spikelets, and the projecting bract; add a stem cross-section inset.

Sources: [Flora of North America treatment via herbarium consortium](https://www.midwestherbaria.org/portal/taxa/index.php?clid=5944&taxauthid=1&tid=2246).

### 11. Western Goldenrod

**Priority rework · High confidence in leaf correction.** Assumed taxon: *Euthamia occidentalis*, consistent with the card's flat-topped-flower clue.

Artwork: [WESTERN_GOLDENROD.png](../assets/WESTERN_GOLDENROD.png)

**Reference:** Narrow, linear, stalkless leaves with 3–5 longitudinal veins. FNA describes blades about 8.2–10 cm × 4.3–10 mm, 10–27 times longer than wide. Heads are small; inflorescences vary and need not form one perfectly flat dome.

**Observed:** Many leaves are broad tapered blades rather than grass-like strips, and the large, individually legible daisies dominate. This encourages a generic yellow-daisy identification.

**Correction:** Narrow the leaves substantially and show longitudinal veins in an inset. Reduce individual heads, create multiple small clustered branches, and retain a natural range of cluster heights.

Sources: [FNA treatment via herbarium consortium](https://midwestherbaria.org/portal/taxa/index.php?taxon=3685), [2021 taxonomic revision](https://www.phytoneuron.net/wp-content/uploads/2021/10/34PhytoN-Euthamia.pdf).

### 12. Coyote Brush

**Broadly usable · High confidence.** Assumed taxon: *Baccharis pilularis*.

Artwork: [COYOTE_BRUSH.png](../assets/COYOTE_BRUSH.png)

**Reference:** A densely branched woody shrub with small oval to obovate leaves, often toothed near their outer portions. UC Irvine describes leaves 1.5–4 cm long and 5–15 mm wide; plants have separate sexes.

**Observed:** Woody shrub architecture, small blunt-toothed leaves, and pale fluffy heads are convincing. This is one of the stronger whole-plant depictions.

**Correction:** Keep; label the illustrated state as a female plant in fruit rather than implying all individuals always have white fluff. Add one enlarged leaf and retain the whole shrub in the card crop.

Sources: [UC Irvine, coyote brush](https://nathistoc.bio.uci.edu/Plants%20of%20Upper%20Newport%20Bay%20(Robert%20De%20Ruff)/Asteraceae/Baccharis%20piluaris.htm).

### 13. Pacific Cordgrass

**Priority rework · High confidence.** Assumed taxon: *Spartina foliosa* / *Sporobolus foliosus*.

Artwork: [PACIFIC_CORDGRASS.png](../assets/PACIFIC_CORDGRASS.png)

**Reference:** Leafy upright shoots and a compact inflorescence composed of several close-pressed spikelike branches. The regional treatment describes 3–13 such branches and blades about 13.5–27 cm × 8–15 mm, with the upper blade rolling inward.

**Observed:** Every head appears as one simple two-sided grain spike. The plant is presented as a dense basal tussock, obscuring leaf-bearing culms and rhizomatous spread.

**Correction:** Draw a few complete leafy culms connected by a rhizome. Show several appressed branches within each flowering head, plus one enlarged branch showing its one-sided spikelet arrangement. Add a rolled blade-tip detail. Do not imply that this illustration distinguishes every native/non-native cordgrass hybrid.

Sources: [Prigge & Gibson, California cordgrass](https://www.smmflowers.org/mobile/ANF-descriptions/Spartina_foliosa_UCLA_SantaMonicas.pdf), [Kew accepted name](https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A77144697-1/general-information).

### 14. Perennial Pepperweed

**Priority rework · High confidence.** Assumed taxon: *Lepidium latifolium*.

Artwork: [PERENNIAL_PEPPERWEED.png](../assets/PERENNIAL_PEPPERWEED.png)

**Reference:** Smooth green to gray-green, alternate leaves; lower leaves are larger and stalked, upper leaves smaller and nearly stalkless. Basal leaves can reach about 30 × 8 cm. Dense clusters contain tiny four-petaled white flowers.

**Observed:** Pale yellow-white blotches dominate nearly every leaf. A damaged plant could have marks, but these are not a normal diagnostic cue and risk becoming the feature users memorize. Lower foliage is cropped away in the source, and flower units look large and frilly.

**Correction:** Remove the conspicuous blotches, restore healthy leaf surfaces and clear venation, include a broad basal leaf, and make tiny four-petaled flowers visible in a separate inset. Keep the tall branched white-flowering outline.

Sources: [UC IPM identification gallery](https://ipm.ucanr.edu/weeds-identification-gallery/perennial-pepperweed-tall-whitetop/), [UC IPM illustrated reference](https://ipm.ucanr.edu/pdf/pestnotes/pnperennialpepperweed.pdf).

### 15. Slender Iceplant

**Priority rework · High confidence in missing surface detail; medium in flower proportions.** Assumed taxon: *Mesembryanthemum nodiflorum*.

Artwork: [SLENDER_ICEPLANT.png](../assets/SLENDER_ICEPLANT.png)

**Reference:** Small, mostly prostrate annual with near-cylindrical succulent leaves and conspicuous glistening surface cells. PlantNET gives leaves to 25 mm × 1–2 mm and flowers 3–6 mm across; a California regional account reports larger flowers, so exact flower diameter should follow the selected local reference.

**Observed:** The foliage is smooth and finger-shaped, with showy daisy-like flowers dominating a dense ornamental-looking mat. The characteristic glistening surface is missing and stem/leaf attachment is obscured.

**Correction:** Show fewer, short-pedicelled small flowers among cylindrical leaves, including bead-like bladder cells in an inset. Use a more open low annual habit and optional reddish older foliage. Do not replace it with a generic garden iceplant.

Sources: [Royal Botanic Gardens Sydney, PlantNET](https://plantnet.rbgsyd.nsw.gov.au/cgi-bin/NSWfl.pl?lvl=sp&name=Mesembryanthemum~nodiflorum&page=nswfl), [California regional treatment](https://www.smmflowers.org/bloom/ANF-descriptions/Mesembryanthemum_nodiflorum_UCLA_SantaMonicas.pdf).

### 16. Yellow Starthistle

**Refine · High confidence; flower close-up is useful.** Assumed taxon: *Centaurea solstitialis*.

Artwork: [YELLOW_STARTHISTLE.png](../assets/YELLOW_STARTHISTLE.png)

**Reference:** Yellow tubular florets above long stiff involucral spines. Stem leaves are narrow and extend down the stems as wings; basal rosette leaves are more deeply lobed and usually wither by flowering.

**Observed:** The spiny yellow head is strongly recognizable, but the illustration is almost exclusively a flower close-up. It provides virtually no evidence for leaf shape, plant scale, or nonflowering identification.

**Correction:** Retain this as an inset beside a whole branching plant. Add a winged stem and a separate earlier-stage rosette; do not imply a lush rosette must persist beneath a fully flowering adult.

Sources: [UC IPM identification gallery](https://ipm.ucanr.edu/weeds-identification-gallery/yellow-starthistle/).

### 17. Fennel

**Priority rework · High confidence.** Intended comparison: wild *Foeniculum vulgare*.

Artwork: [FENNEL.png](../assets/FENNEL.png)

**Reference:** Wild fennel forms tall branching canes from a perennial crown, with finely divided thread-like foliage and compound yellow umbels. Cal-IPC describes whole leaf blades 10–60 cm long. The swollen edible leaf-base bulb belongs to Florence fennel cultivars.

**Observed:** The prominent white bulb teaches cultivated vegetable fennel. Feathery leaves and umbels are useful, but the pale thin lines will be difficult to read at card size.

**Correction:** Replace the bulb with a crown and tall branching wild stems. Keep thread-like foliage, clarify the sheathing leaf bases, and increase contrast. Label a whole leaf versus a final thread-like division when giving dimensions.

Sources: [Cal-IPC wild fennel description](https://www.cal-ipc.org/resources/library/publications/ipcw/report51/), [UC Sonoma, Florence versus other fennels](https://ucanr.edu/site/mg-sonoma/fennel).

### 18. Pampas Grass

**Refine · High confidence in missing leaf mass; species unresolved.** Provisional taxon: *Cortaderia selloana*; compare *C. jubata*.

Artwork: [PAMPAS_GRASS.png](../assets/PAMPAS_GRASS.png)

**Reference:** Large dense tussock of long folded leaves and substantial plumes. True pampas grass is commonly 6–13 ft tall; foliage/plume proportions and curled leaf tips help distinguish it from jubata grass. Sex affects plume and culm characters.

**Observed:** Plumes communicate the group, but foliage is a sparse collection of hair-thin lines and occupies a small fraction of the plant. The drawing does not justify a confident species distinction.

**Correction:** Confirm the target species, restore a dense fountain of strap-like folded blades, and add a curled tip/edge inset where appropriate. Increase plume contrast and match stalk-to-tussock proportions to the chosen specimen.

Sources: [Cal-IPC pampas grass](https://www.cal-ipc.org/resources/library/publications/ipcw/report35/), [Cal-IPC comparison with jubata grass](https://www.cal-ipc.org/resources/library/publications/ipcw/report33/).

### 19. Mustard

**Refine; species approval blocked by broad label · High confidence in ambiguity.** Target currently unspecified: *Brassica* or related mustard species.

Artwork: [MUSTARD.png](../assets/MUSTARD.png)

**Reference:** Many mustards share four yellow petals, alternate foliage, larger lobed lower leaves, and smaller upper leaves. Pod length, orientation, leaf bases, and hairiness vary by species.

**Observed:** Four petals and long pods support a mustard-group identification. The few small lobed leaves and omitted basal rosette cannot teach a particular species' foliage. “Mustard” does not define a single correct leaf size.

**Correction:** Choose the local target, such as black mustard if that is intended, then match its leaves and pods to a reference. Include a large lower leaf and an upper stem leaf. If keeping a group-level card, explicitly accept group-level recognition rather than implying species precision.

Sources: [UC IPM mustard identification](https://ipm.ucanr.edu/weeds-identification-gallery/mustards/).

### 20. Russian Thistle

**Refine · High confidence in missing live-stage cues; exact species unresolved.** Provisional group: *Salsola tragus* and related Russian thistles.

Artwork: [RUSSIAN_THISTLE.png](../assets/RUSSIAN_THISTLE.png)

**Reference:** Living plants have narrow fleshy to leathery, sharp-tipped leaves; UC IPM gives about 8–52 mm long and up to 1 mm wide. Mature plants become rounded, stiff, and spiny before drying and detaching.

**Observed:** The spiny sphere works as a tumbleweed symbol, but almost all live foliage, the rooted base, and individual axillary structures disappear into a pale tangle. A user could learn “any tumbleweed.”

**Correction:** Make a rooted green plant the main view, with a clear leafy shoot and small axillary flower/fruit inset. Keep the dry ball as a secondary seasonal silhouette. Confirm the species if species-level recognition is required.

Sources: [UC IPM Russian thistle gallery](https://ipm.ucanr.edu/weeds-identification-gallery/russian-thistle/).

### 21. Poison Hemlock

**Refine · High confidence.** Assumed taxon: *Conium maculatum*.

Artwork: [POISON_HEMLOCK.png](../assets/POISON_HEMLOCK.png)

**Reference:** Alternate, repeatedly divided leaves with an overall triangular outline; smooth hairless stems with purple mottling; compound white umbels. First-year rosette leaves may be at least 2 ft long.

**Observed:** White umbels, divided leaves, and purple stem marks are all present. This is a good foundation, but the spotting is tiny relative to the whole image, lower leaf extent is missing, and the prominent star-like bracts under umbels deserve comparison with a verified specimen.

**Correction:** Add a magnified hairless purple-mottled stem and a full triangular leaf. Make the stem cue readable on a phone and check the bracts against the reference. This remains a learning illustration, not sufficient evidence for a real-world handling or edibility decision.

Sources: [UC IPM poison hemlock identification](https://ipm.ucanr.edu/home-and-landscape/poison-hemlock/).

### 22. Stinkwort

**Priority rework · High confidence in omitted diagnostic texture; medium in habit criticism.** Assumed taxon: *Dittrichia graveolens*.

Artwork: [STINKWORT.png](../assets/STINKWORT.png)

**Reference:** A sticky, hairy annual with narrow leaves and small yellow heads. FNA gives leaves typically 1–3 cm × 1–3 mm, with larger extremes; glandular hairs cover stems and leaves.

**Observed:** Smooth, sparse green outlines and neatly open daisies could describe many unrelated yellow-flowered plants. Some outlined leaves almost disappear into the background. No glandular or sticky-looking texture survives.

**Correction:** Show the densely branched plant, filled narrow alternate leaves, and short-stalked small heads. Add a magnified glandular-haired leaf/stem; smell cannot be communicated by illustration, so the visible glandular texture matters especially here.

Sources: [Flora of North America](https://www.efloras.org/florataxon.aspx?flora_id=1&taxon_id=250066482), [Kew morphology](https://powo.science.kew.org/taxon/urn%3Alsid%3Aipni.org%3Anames%3A201892-1/general-information).

### 23. Wild Radish

**Refine · High confidence in missing cues; taxon needs confirmation.** Comparison taxon: *Raphanus raphanistrum*; confirm whether the local target is *R. sativus* or a hybrid population.

Artwork: [WILD_RADISH.png](../assets/WILD_RADISH.png)

**Reference:** Rough/hairy, lobed lower leaves and four veined petals. Jointed/constricted fruits help distinguish wild radish from many mustards; lower and upper leaves differ.

**Observed:** Veined pale flowers and lobed foliage work. Leaves and stems look smooth, lower foliage is undersized in emphasis, and the pods look like smooth generic mustard pods with dots instead of clear constrictions.

**Correction:** Add the rough leaf surface, a more prominent lower leaf/rosette, and a mature fruit appropriate to the confirmed local taxon. Include flower-color variation in supporting material rather than teaching purple veins as an exclusive identifier.

Sources: [Cornell wild radish identification](https://blogs.cornell.edu/weedid/wild-radish/), [Cornell weed profile](https://cals.cornell.edu/weed-science/weed-profiles/wild-radish).

### 24. Brass-Buttons

**Priority rework · High confidence in missing sheath/habit; medium in leaf-form criticism.** Assumed taxon: *Cotula coronopifolia*.

Artwork: [BRASS_BUTTONS.png](../assets/BRASS_BUTTONS.png)

**Reference:** Fleshy, spreading shoots with alternate leaves whose bases sheath the stem; leaves can be entire or lobed. The California treatment describes unlobed blades 20–45 × 4–5 mm and lobed blades to 80 mm long. Yellow button heads lack showy rays. More divided forms occur elsewhere.

**Observed:** The yellow buttons are useful, but repeated fern-like foliage around one central rooted crown overwhelms the image. Neither the diagnostic sheathing bases nor stems rooting along the ground is clear.

**Correction:** Redraw a short creeping fleshy stem, rooted at several nodes, with visible closed leaf sheaths and a locally representative mix of simple/few-lobed leaves. Keep the rayless yellow heads. Do not call all divided leaves impossible: the documented variation makes that too strong.

Sources: [Prigge & Gibson, California treatment](https://www.smmflowers.org/bloom/ANF-descriptions/Cotula_coronopifolia_UCLA_SantaMonicas.pdf), [SANBI, variation and leaf sheaths](https://pza.sanbi.org/cotula-coronopifolia).

### 25. Australian Saltbush

**Broadly usable · Medium-high confidence.** Assumed taxon: *Atriplex semibaccata*.

Artwork: [AUSTRALIAN_SALTBUSH.png](../assets/AUSTRALIAN_SALTBUSH.png)

**Reference:** Prostrate to semi-erect branches, small gray-green leaves, and red rhombic fruiting bracteoles. VicFlora gives leaves mostly 6–18 mm long, sometimes to 25 mm, and fruiting bracteoles 2–5 mm across; margins may be entire or irregularly toothed.

**Observed:** Spreading branches, small leaves, and red diamond-like structures form a useful identifying combination. Leaves appear smooth but include lighter undersides. The wide branch arrangement is especially vulnerable to `cover` cropping.

**Correction:** Keep; emphasize the mealy/scurfy underside in one leaf inset and enlarge one fruiting pair. A few irregular teeth are optional within variation, not mandatory on every leaf. Add scale rather than making the fruit larger in the main specimen.

Sources: [Royal Botanic Gardens Victoria, VicFlora](https://vicflora.rbg.vic.gov.au/flora/taxon/b0c88d5d-ba8f-40b8-b5a4-e3a610171742).

### 26. Hottentot Fig

**Refine · High confidence.** Assumed taxon: *Carpobrotus edulis*.

Artwork: [HOTTENTOT_FIG.png](../assets/HOTTENTOT_FIG.png)

**Reference:** Opposite, thick succulent leaves with a sharply triangular cross-section, trailing rooting stems, and large many-parted yellow flowers. Published measurements include leaves about 4–10 cm long and 5–12 mm wide.

**Observed:** Trailing stem, opposite fleshy-looking leaves, reddish tips, and yellow flowers identify the general iceplant form. The leaves read as flattened pointed blades with a central line rather than three-dimensional triangular prisms.

**Correction:** Show distinct leaf faces and a keel using shading; add a triangular cross-section inset and a leaf scale bar. Preserve the creeping stem and large flower. Avoid treating flower color alone as enough to resolve related species or hybrids.

Sources: [leaf morphology study](https://scialert.net/fulltext/?doi=ajps.2021.15.23), [CNPS comparison of Carpobrotus species](https://cnpsslo.org/wp-content/uploads/2012/03/April2012c.pdf).

## Acceptance criteria for revised illustrations

- Confirm one scientific taxon or explicitly label a broader group, and archive the reference used for the artwork.
- At the actual card size, show at least two independent visible identifying features, including foliage or stem structure as well as flowers where possible.
- Match leaf arrangement, outline, margin, surface, thickness, and relative size to a documented specimen. Include real dimensions with a correctly calibrated scale bar.
- Keep all diagnostic features inside the displayed image; use separate magnification for small structures.
- Run a blind recognition check with local plant experts and a small novice group using unseen specimen photos. Distinguish recognition within this 26-card deck from reliable field identification.

No game code or source illustrations were changed during this audit. The priorities above are a sourced editorial review, not a botanical certification or measured claim that a particular percentage of users will identify each plant correctly.
