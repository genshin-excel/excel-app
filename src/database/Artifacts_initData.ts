import { Artifact } from '../models/Artifacts';
import ArtifactData from '../data/artifacts.json';

export const artifactsMap = new Map<string, Artifact>();

function addWeapon(artifact: Artifact) {
  artifactsMap.set(artifact.id, artifact);
}

const artifactDataArray = ArtifactData as Artifact[];

artifactDataArray.forEach((artifactData) => {
  addWeapon({
    ...artifactData,
    thumbnail: process.env.PUBLIC_URL + artifactData.thumbnail,
  });
});
