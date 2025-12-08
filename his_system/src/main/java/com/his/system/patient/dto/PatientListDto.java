package com.his.system.patient.dto;

import com.his.system.patient.Patient;
import lombok.Getter;

@Getter
public class PatientListDto {

    private String name;
    private String chartNo;
    private String phone;
    private String address;

    private String birthdate;

    public PatientListDto(Patient patient) {
        this.name = patient.getName();
        this.chartNo = patient.getChartNo();
        this.phone = patient.getPhone();
        this.address = patient.getAddress();
        this.birthdate = (patient.getBirthdate() != null)
                ? patient.getBirthdate().toString()
                : null;
    }
}
