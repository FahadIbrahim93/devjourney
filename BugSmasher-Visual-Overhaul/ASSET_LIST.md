# BugSmasher Asset List & Specifications

================================================================================
## BUG MODELS - 15 TYPES
================================================================================

### Alpha Predator Bugs (Boss Tier)
| Bug Type | Polygon Count | Texture Size | Animation Frames | Special Effects |
|----------|---------------|--------------|------------------|-----------------|
| Armored Beetle | 8,000-12,000 | 1024x1024 | 24 key poses | Emissive cracks, armor wear |
| Shadow Moth | 6,000-8,000 | 1024x1024 | 18 key poses | Transparency, shadow particles |

### Elite Bugs (Mini-Boss Tier)
| Bug Type | Polygon Count | Texture Size | Animation Frames | Special Effects |
|----------|---------------|--------------|------------------|-----------------|
| Crystal Stag | 7,000-10,000 | 1024x1024 | 20 key poses | Refraction, fracture VFX |
| Venom Widow | 5,000-7,000 | 1024x1024 | 16 key poses | Poison drip, web particles |
| Thunder Hornet | 4,000-6,000 | 1024x1024 | 22 key poses | Lightning, electric aura |

### Standard Bugs (Common Tier)
| Bug Type | Polygon Count | Texture Size | Animation Frames | Special Effects |
|----------|---------------|--------------|------------------|-----------------|
| Ember Firefly | 2,500-3,500 | 512x512 | 12 key poses | Flame particles, heat FX |
| Frost Needle | 2,000-3,000 | 512x512 | 10 key poses | Ice particles, frost trail |
| Magma Crawler | 3,000-4,000 | 512x512 | 14 key poses | Lava drip, ember particles |
| Electric Jolt | 2,500-3,500 | 512x512 | 16 key poses | Lightning arcs, static |
| Shadow Leech | 2,000-2,500 | 512x512 | 8 key poses | Dark mist, red aura |

### Special Variant Bugs
| Bug Type | Polygon Count | Texture Size | Animation Frames | Special Effects |
|----------|---------------|--------------|------------------|-----------------|
| Mirror Mimic | 3,000-4,000 | 512x512 | 12 key poses | Reflection shader |
| Hive Drone | 3,500-4,500 | 512x512 | 14 key poses | Wax particles, hive aura |
| Phase Ghost | 2,000-3,000 | 512x512 | 8 key poses | Transparency, distortion |
| Titan Larva | 4,000-5,000 | 512x512 | 10 key poses | Pulsing veins, spawn FX |

================================================================================
## BIOME ASSETS
================================================================================

### Neon Cyberpunk District
- Environment meshes: 50,000 polygons (modular buildings)
- Particle textures: 32 textures at 128x128
- Lighting probes: 20 volumetric lights
- Post-processing: Chroma, scanlines, glitch

### Verdant Overgrowth
- Tree models: 15 LOD variants (5,000-15,000 polys each)
- Grass system: Instanced rendering
- Particle textures: 24 nature textures at 64x64
- Wind simulation: Vertex shader based

### Infernal Wastes
- Lava materials: Flow shader with noise
- Particle textures: 18 fire/smoke textures at 128x128
- Decals: 8 ground burn marks
- Heat effects: Distortion shaders

### Cryogenic Peaks
- Ice crystal meshes: 8 variants (500-2,000 polys each)
- Snow particle system: 4 texture variants
- Aurora shader: Gradient noise based
- Reflection probes: 12 per area

### Toxic Swamp
- Water surface: Refraction shader
- Algae particles: 6 variants at 64x64
- Gas cloud system: Volumetric alpha
- Sludge decals: 6 variants

### Void Netherworld
- Nebula textures: 8 at 512x512
- Star field: 1 background texture
- Vortex shader: Radial distortion
- Cosmic dust: Particle system

================================================================================
## VFX TEXTURE LIBRARY
================================================================================

### Impact Effects (64x64 to 256x256)
1. hit_spark_01.png - White/yellow burst
2. hit_spark_02.png - Blue energy
3. hit_spark_03.png - Red plasma
4. critical_flash.png - Rainbow burst
5. death_explosion_01.png - Smoke debris
6. death_explosion_02.png - Bio organic
7. death_explosion_03.png - Crystal shards
8. ground_impact.png - Dust crack

### Particle Textures (32x32 to 128x128)
**Smoke/Fire:**
- smoke_01.png through smoke_04.png
- fire_01.png through fire_04.png
- ember_01.png through ember_03.png

**Nature:**
- leaf_01.png through leaf_03.png
- pollen_01.png through pollen_02.png
- spore_01.png through spore_03.png

**Magic/Energy:**
- energy_01.png through energy_04.png
- spark_01.png through spark_03.png
- aura_01.png through aura_02.png

**Debris:**
- metal_01.png through metal_02.png
- wood_01.png through wood_02.png
- crystal_01.png through crystal_03.png

### UI Textures (256x256 to 512x512)
- button_normal.png - Base button state
- button_hover.png - Glow overlay
- button_pressed.png - Depression effect
- progress_bg.png - Bar background
- progress_fill.png - Animated fill
- bug_icon_sheet.png - All bug icons (4x4 grid)

================================================================================
## SHADER SPECIFICATIONS
================================================================================

### Surface Shaders (HLSL/GLSL)
1. **Bioluminescent.shader**
   - Properties: _MainTex, _EmissionColor, _PulseSpeed
   - Features: Animated emissive, rim lighting

2. **Armored.shader**
   - Properties: _MainTex, _Metallic, _ScratchMask
   - Features: Metallic reflection, damage wear

3. **Crystalline.shader**
   - Properties: _MainTex, _Refraction, _FacetCount
   - Features: Refraction, facet reflection

4. **Corrupted.shader**
   - Properties: _MainTex, _CorruptionMask, _SpreadSpeed
   - Features: Animated corruption spread, pulse

### Post-Processing Shaders
1. **ChromaticAberration.shader** - RGB shift effect
2. **Vignette.shader** - Focus attention darkening
3. **ColorGrading.shader** - Biome tints
4. **FilmGrain.shader** - Cinematic texture
5. **MotionBlur.shader** - Fast movement streaks

### Particle Shaders
1. **StandardParticle.shader** - Alpha blended
2. **AdditiveParticle.shader** - Light effects
3. **MultiplicativeParticle.shader** - Shadow effects
4. **DistortionParticle.shader** - Screen warp

================================================================================
## AUDIO-VISUAL SYNCHRONIZATION
================================================================================

### Beat-Synced Effects
- Button hover: 120-140 BPM range
- Bug spawn: Random but musically timed
- Critical hit: Align with musical accents

### Screen Effect Timings
- Impact shake: 0.2-0.5 seconds
- Death freeze: 0.1 seconds minimum
- Level up: 1.0 second animation
- Biome transition: 3.0 seconds

================================================================================
## PERFORMANCE TARGETS
================================================================================

### Mobile (iOS/Android)
- Draw calls: < 70 per frame
- Polygon count: < 50,000 visible
- Particle count: < 2,000
- Texture memory: < 128MB

### PC (Minimum)
- Draw calls: < 150 per frame
- Polygon count: < 200,000 visible
- Particle count: < 10,000
- Texture memory: < 512MB

### PC (High-End)
- Draw calls: < 300 per frame
- Polygon count: < 500,000 visible
- Particle count: < 50,000
- Texture memory: < 2GB

================================================================================
## FILE STRUCTURE
================================================================================

```
/assets
  /bugs
    /models
      /alpha
        beetle.fbx
        moth.fbx
      /elite
        crystal_stag.fbx
        venom_widow.fbx
        thunder_hornet.fbx
      /standard
        firefly.fbx
        frost_needle.fbx
        magma_crawler.fbx
        electric_jolt.fbx
        shadow_leech.fbx
      /special
        mirror_mimic.fbx
        hive_drone.fbx
        phase_ghost.fbx
        titan_larva.fbx
    /textures
      /ao
      /albedo
      /normal
      /emissive
  /biomes
    /cyberpunk
    /overgrowth
    /infernal
    /cryogenic
    /swamp
    /void
  /particles
    /textures
    /systems
  /shaders
    /surface
    /postprocess
    /particle
  /ui
    /textures
    /fonts
    /animations
```