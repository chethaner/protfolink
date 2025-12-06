// Export utility functions for ML features
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportAsJSON = (data, filename) => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
};

export const exportSkillsAsCSV = (categorizedSkills) => {
    let csv = 'Skill,Category\n';
    Object.entries(categorizedSkills).forEach(([category, skills]) => {
        skills.forEach(skill => {
            csv += `"${skill}","${category}"\n`;
        });
    });

    const dataBlob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `skill-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
};

export const exportSkillsAsPDF = (analysis) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(212, 175, 55); // Gold color
    doc.text('Skill Analysis Report', 20, 20);

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);

    // Summary
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Total Skills Found: ${analysis.totalSkills}`, 20, 40);

    // Skills by Category
    let yPos = 50;
    Object.entries(analysis.categorizedSkills || {}).forEach(([category, skills]) => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(212, 175, 55);
        doc.text(category, 20, yPos);
        yPos += 7;

        doc.setFontSize(10);
        doc.setTextColor(0);
        const skillsText = skills.join(', ');
        const lines = doc.splitTextToSize(skillsText, 170);
        doc.text(lines, 20, yPos);
        yPos += (lines.length * 5) + 10;
    });

    doc.save(`skill-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportGapAnalysisAsPDF = (analysis) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(212, 175, 55);
    doc.text('Skill Gap Analysis', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);

    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text(`Overall Match: ${analysis.overallMatch || 0}%`, 20, 45);

    let yPos = 60;

    // Matching Skills
    if (analysis.matchingSkills && analysis.matchingSkills.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(34, 197, 94);
        doc.text(`✓ Matching Skills (${analysis.matchingSkills.length})`, 20, yPos);
        yPos += 7;

        doc.setFontSize(10);
        doc.setTextColor(0);
        const matchingText = analysis.matchingSkills.join(', ');
        const lines = doc.splitTextToSize(matchingText, 170);
        doc.text(lines, 20, yPos);
        yPos += (lines.length * 5) + 15;
    }

    // Missing Skills
    if (analysis.missingSkills && analysis.missingSkills.length > 0) {
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(239, 68, 68);
        doc.text(`✗ Missing Skills (${analysis.missingSkills.length})`, 20, yPos);
        yPos += 10;

        analysis.missingSkills.forEach(item => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFontSize(11);
            doc.setTextColor(0);
            doc.text(`• ${item.skill}`, 25, yPos);
            yPos += 5;

            if (item.importance) {
                doc.setFontSize(9);
                doc.setTextColor(100);
                doc.text(`  Priority: ${item.importance}/10`, 30, yPos);
                yPos += 4;
            }

            if (item.reason) {
                doc.setFontSize(9);
                const reasonLines = doc.splitTextToSize(item.reason, 150);
                doc.text(reasonLines, 30, yPos);
                yPos += (reasonLines.length * 4) + 5;
            }
        });
    }

    doc.save(`skill-gap-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportLearningPathAsPDF = (learningPath) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(212, 175, 55);
    doc.text('Learning Path', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);

    if (learningPath.targetRole) {
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text(`Target Role: ${learningPath.targetRole}`, 20, 45);
    }

    if (learningPath.totalEstimatedTime) {
        doc.setFontSize(12);
        doc.text(`Total Time: ${learningPath.totalEstimatedTime}`, 20, 55);
    }

    let yPos = 70;

    if (learningPath.learningPath && Array.isArray(learningPath.learningPath)) {
        learningPath.learningPath.forEach(phase => {
            if (yPos > 260) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFontSize(14);
            doc.setTextColor(212, 175, 55);
            doc.text(phase.phase || 'Phase', 20, yPos);
            yPos += 10;

            if (phase.skills) {
                phase.skills.forEach(skillItem => {
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }

                    doc.setFontSize(11);
                    doc.setTextColor(0);
                    doc.text(`• ${skillItem.skill}`, 25, yPos);
                    yPos += 5;

                    if (skillItem.estimatedTime) {
                        doc.setFontSize(9);
                        doc.setTextColor(100);
                        doc.text(`  Time: ${skillItem.estimatedTime}`, 30, yPos);
                        yPos += 4;
                    }

                    if (skillItem.priority) {
                        doc.text(`  Priority: ${skillItem.priority}/5`, 30, yPos);
                        yPos += 6;
                    }
                });
            }

            yPos += 5;
        });
    }

    doc.save(`learning-path-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportCareerInsightsAsPDF = (insights) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(212, 175, 55);
    doc.text('Career Insights', 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 30);

    let yPos = 45;

    if (insights.salaryEstimate) {
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text('Salary Estimate', 20, yPos);
        yPos += 8;

        doc.setFontSize(11);
        doc.text(`Min: $${insights.salaryEstimate.min?.toLocaleString() || 'N/A'}`, 25, yPos);
        yPos += 6;
        doc.text(`Median: $${insights.salaryEstimate.median?.toLocaleString() || 'N/A'}`, 25, yPos);
        yPos += 6;
        doc.text(`Max: $${insights.salaryEstimate.max?.toLocaleString() || 'N/A'}`, 25, yPos);
        yPos += 15;
    }

    if (insights.careerTrajectory) {
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text('Career Trajectory', 20, yPos);
        yPos += 8;

        doc.setFontSize(11);
        if (insights.careerTrajectory.oneYear) {
            doc.text('1 Year: ' + insights.careerTrajectory.oneYear.join(', '), 25, yPos);
            yPos += 6;
        }
        if (insights.careerTrajectory.threeYears) {
            doc.text('3 Years: ' + insights.careerTrajectory.threeYears.join(', '), 25, yPos);
            yPos += 6;
        }
        if (insights.careerTrajectory.fiveYears) {
            doc.text('5 Years: ' + insights.careerTrajectory.fiveYears.join(', '), 25, yPos);
            yPos += 15;
        }
    }

    if (insights.recommendations && insights.recommendations.length > 0) {
        if (yPos > 240) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text('Recommendations', 20, yPos);
        yPos += 8;

        doc.setFontSize(10);
        insights.recommendations.forEach(rec => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            const lines = doc.splitTextToSize(`• ${rec}`, 170);
            doc.text(lines, 25, yPos);
            yPos += (lines.length * 5) + 3;
        });
    }

    doc.save(`career-insights-${new Date().toISOString().split('T')[0]}.pdf`);
};
